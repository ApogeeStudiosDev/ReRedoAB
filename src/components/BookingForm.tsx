import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, CheckCircle, Package, X, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import BookingConfirmation from "@/components/BookingConfirmation";
import type { Database } from "@/integrations/supabase/types";
import { motion, AnimatePresence } from "framer-motion";

type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

interface SelectedPackage {
  id: string;
  name: string;
  description: string;
  monthly_price: number;
  company_type: 'AB' | 'EF';
  package_tier: string;
  included_services: string[];
  selected_at: string;
}

interface BookingFormData {
  companyName: string;
  organizationNumber: string;
  industry: string;
  companySize: string;
  contactName: string;
  email: string;
  phone: string;
  currentSituation: string[];
  challenges: string[];
  additionalInfo: string;
  selectedPackage?: SelectedPackage | null;
}

interface FormErrors {
  companyName?: string;
  organizationNumber?: string;
  industry?: string;
  companySize?: string;
  contactName?: string;
  email?: string;
  currentSituation?: string;
  challenges?: string;
}

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const { toast } = useToast();
  const [formData, setFormData] = useState<BookingFormData>({
    companyName: "",
    organizationNumber: "",
    industry: "",
    companySize: "",
    contactName: "",
    email: "",
    phone: "",
    currentSituation: [],
    challenges: [],
    additionalInfo: "",
    selectedPackage: null
  });

  // Load selected package from localStorage on component mount
  useEffect(() => {
    const savedPackage = localStorage.getItem('selectedPackage');
    if (savedPackage) {
      try {
        const packageData = JSON.parse(savedPackage) as SelectedPackage;
        setFormData(prev => ({ ...prev, selectedPackage: packageData }));
      } catch (error) {
        console.error('Error parsing saved package:', error);
      }
    }
  }, []);

  const removeSelectedPackage = () => {
    localStorage.removeItem('selectedPackage');
    setFormData(prev => ({ ...prev, selectedPackage: null }));
    toast({
      title: "Paket borttaget",
      description: "Du kan välja ett nytt paket från prissidan.",
      duration: 2000
    });
  };

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateOrgNumber = (orgNumber: string): boolean => {
    // Swedish org number format: XXXXXX-XXXX or XXXXXXXXXX
    const cleanedNumber = orgNumber.replace(/[-\s]/g, '');
    return /^\d{10}$/.test(cleanedNumber);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.companyName.trim()) {
        newErrors.companyName = "Företagsnamn krävs";
      }
      if (!formData.organizationNumber.trim()) {
        newErrors.organizationNumber = "Organisationsnummer krävs";
      } else if (!validateOrgNumber(formData.organizationNumber)) {
        newErrors.organizationNumber = "Ogiltigt format (XXXXXX-XXXX)";
      }
      if (!formData.industry.trim()) {
        newErrors.industry = "Bransch krävs";
      }
      if (!formData.companySize) {
        newErrors.companySize = "Välj företagsstorlek";
      }
      if (!formData.contactName.trim()) {
        newErrors.contactName = "Kontaktperson krävs";
      }
      if (!formData.email.trim()) {
        newErrors.email = "E-post krävs";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Ogiltig e-postadress";
      }
    }

    if (step === 2) {
      if (formData.currentSituation.length === 0) {
        newErrors.currentSituation = "Välj minst ett alternativ";
      }
      if (formData.challenges.length === 0) {
        newErrors.challenges = "Välj minst en utmaning";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleMultiSelect = (field: 'currentSituation' | 'challenges', option: string) => {
    setFormData(prev => {
      const currentSelection = prev[field];
      const isSelected = currentSelection.includes(option);

      if (isSelected) {
        return {
          ...prev,
          [field]: currentSelection.filter(item => item !== option)
        };
      } else if (currentSelection.length < 3) {
        return {
          ...prev,
          [field]: [...currentSelection, option]
        };
      }
      return prev;
    });
    // Clear error when user makes selection
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // 1. Save to Supabase database
      const bookingData: BookingInsert = {
        company_name: formData.companyName,
        organization_number: formData.organizationNumber,
        industry: formData.industry,
        company_size: formData.companySize,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone || null,
        current_situation: formData.currentSituation,
        challenges: formData.challenges,
        additional_info: formData.additionalInfo || null,
        selected_package_id: formData.selectedPackage?.id || null,
        status: 'pending'
      };

      const { error: dbError } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Kunde inte spara bokningen');
      }

      // 2. Send emails via Edge Function
      const { error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
        body: {
          email: formData.email,
          name: formData.contactName,
          phone: formData.phone,
          companyName: formData.companyName,
          organizationNumber: formData.organizationNumber,
          industry: formData.industry,
          companySize: formData.companySize,
          currentSituation: formData.currentSituation,
          challenges: formData.challenges,
          additionalInfo: formData.additionalInfo,
          selectedPackage: formData.selectedPackage ? {
            name: formData.selectedPackage.name,
            monthly_price: formData.selectedPackage.monthly_price,
            company_type: formData.selectedPackage.company_type,
            package_tier: formData.selectedPackage.package_tier,
            included_services: formData.selectedPackage.included_services
          } : null
        }
      });

      if (emailError) {
        console.error('Email error:', emailError);
        // Don't throw - booking is saved, just log email error
      }

      // Show confirmation
      setSubmittedData({...formData});
      setShowConfirmation(true);

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          companyName: "",
          organizationNumber: "",
          industry: "",
          companySize: "",
          contactName: "",
          email: "",
          phone: "",
          currentSituation: [],
          challenges: [],
          additionalInfo: "",
          selectedPackage: null
        });
        setCurrentStep(1);
        localStorage.removeItem('selectedPackage');
      }, 500);

    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Fel vid bokning",
        description: error.message || "Ett oväntat fel uppstod. Försök igen.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSituationOptions = [
    "Hanterar bokföring internt",
    "Använder extern bokförare/revisor",
    "Har egen ekonomiavdelning",
    "Nystartat företag",
    "Växande företag med nya behov",
    "Vill byta från nuvarande lösning"
  ];

  const challengeOptions = [
    "Tidskrävande administration",
    "Otydlig ekonomisk överblick",
    "Skatteoptimering och planering",
    "Månadsrapporter och analys",
    "Kassaflödeshantering",
    "Regelefterlevnad och compliance"
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="font-sora font-bold text-2xl text-black mb-2">
                Företagsinformation
              </h2>
              <p className="font-inter text-black/70 text-sm">
                Berätta om ditt företag så kan vi förbereda oss inför mötet
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName" className="font-inter font-semibold text-sm mb-2 block text-black">
                  Företagsnamn *
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Ditt företags namn"
                  className={`h-12 bg-white border-2 ${errors.companyName ? 'border-red-500' : 'border-black/10'} focus:border-black rounded-xl font-inter`}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1 font-inter">{errors.companyName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="organizationNumber" className="font-inter font-semibold text-sm mb-2 block text-black">
                  Organisationsnummer *
                </Label>
                <Input
                  id="organizationNumber"
                  value={formData.organizationNumber}
                  onChange={(e) => handleInputChange("organizationNumber", e.target.value)}
                  placeholder="XXXXXX-XXXX"
                  className={`h-12 bg-white border-2 ${errors.organizationNumber ? 'border-red-500' : 'border-black/10'} focus:border-black rounded-xl font-inter`}
                />
                {errors.organizationNumber && (
                  <p className="text-red-500 text-xs mt-1 font-inter">{errors.organizationNumber}</p>
                )}
              </div>

              <div>
                <Label htmlFor="industry" className="font-inter font-semibold text-sm mb-2 block text-black">
                  Bransch *
                </Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  placeholder="T.ex. IT, handel, konsulting"
                  className={`h-12 bg-white border-2 ${errors.industry ? 'border-red-500' : 'border-black/10'} focus:border-black rounded-xl font-inter`}
                />
                {errors.industry && (
                  <p className="text-red-500 text-xs mt-1 font-inter">{errors.industry}</p>
                )}
              </div>

              <div>
                <Label htmlFor="companySize" className="font-inter font-semibold text-sm mb-2 block text-black">
                  Företagsstorlek *
                </Label>
                <select
                  id="companySize"
                  value={formData.companySize}
                  onChange={(e) => handleInputChange("companySize", e.target.value)}
                  className={`w-full h-12 rounded-xl border-2 ${errors.companySize ? 'border-red-500' : 'border-black/10'} focus:border-black bg-white px-4 font-inter text-sm`}
                >
                  <option value="">Välj företagsstorlek</option>
                  <option value="1-5">1-5 anställda</option>
                  <option value="6-20">6-20 anställda</option>
                  <option value="21-50">21-50 anställda</option>
                  <option value="51+">51+ anställda</option>
                </select>
                {errors.companySize && (
                  <p className="text-red-500 text-xs mt-1 font-inter">{errors.companySize}</p>
                )}
              </div>

              <div className="border-t border-black/10 pt-6">
                <h3 className="font-sora font-bold text-lg mb-4 text-black">Kontaktuppgifter</h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="contactName" className="font-inter font-semibold text-sm mb-2 block text-black">
                      Kontaktperson *
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      placeholder="Ditt namn"
                      className={`h-12 bg-white border-2 ${errors.contactName ? 'border-red-500' : 'border-black/10'} focus:border-black rounded-xl font-inter`}
                    />
                    {errors.contactName && (
                      <p className="text-red-500 text-xs mt-1 font-inter">{errors.contactName}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-inter font-semibold text-sm mb-2 block text-black">
                      E-post *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="din@email.se"
                      className={`h-12 bg-white border-2 ${errors.email ? 'border-red-500' : 'border-black/10'} focus:border-black rounded-xl font-inter`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1 font-inter">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-inter font-semibold text-sm mb-2 block text-black">
                      Telefon <span className="text-black/50 font-normal">(valfritt)</span>
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="070-123 45 67"
                      className="h-12 bg-white border-2 border-black/10 focus:border-black rounded-xl font-inter"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="font-sora font-bold text-2xl text-black mb-2">
                Er nuvarande situation
              </h2>
              <p className="font-inter text-black/70 text-sm">
                Välj upp till 3 alternativ som beskriver er situation
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="font-inter font-semibold mb-3 block text-sm text-black">
                  Hur hanterar ni ekonomi idag? *
                </Label>
                <div className="space-y-2">
                  {currentSituationOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleMultiSelect('currentSituation', option)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.currentSituation.includes(option)
                          ? "border-black bg-black text-white"
                          : "border-black/10 hover:border-black/30 bg-white"
                      } ${
                        formData.currentSituation.length >= 3 && !formData.currentSituation.includes(option)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.currentSituation.includes(option)
                            ? "border-white bg-white"
                            : "border-black/20"
                        }`}>
                          {formData.currentSituation.includes(option) && (
                            <Check className="w-3 h-3 text-black" />
                          )}
                        </div>
                        <span className="font-inter text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className={`text-xs mt-2 font-inter ${errors.currentSituation ? 'text-red-500' : 'text-black/60'}`}>
                  {errors.currentSituation || `${formData.currentSituation.length}/3 valda`}
                </p>
              </div>

              <div>
                <Label className="font-inter font-semibold mb-3 block text-sm text-black">
                  Vilka utmaningar vill ni lösa? *
                </Label>
                <div className="space-y-2">
                  {challengeOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleMultiSelect('challenges', option)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.challenges.includes(option)
                          ? "border-black bg-black text-white"
                          : "border-black/10 hover:border-black/30 bg-white"
                      } ${
                        formData.challenges.length >= 3 && !formData.challenges.includes(option)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.challenges.includes(option)
                            ? "border-white bg-white"
                            : "border-black/20"
                        }`}>
                          {formData.challenges.includes(option) && (
                            <Check className="w-3 h-3 text-black" />
                          )}
                        </div>
                        <span className="font-inter text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className={`text-xs mt-2 font-inter ${errors.challenges ? 'text-red-500' : 'text-black/60'}`}>
                  {errors.challenges || `${formData.challenges.length}/3 valda`}
                </p>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="font-sora font-bold text-2xl text-black mb-2">
                Granska och skicka
              </h2>
              <p className="font-inter text-black/70 text-sm">
                Vi kontaktar dig inom 24 timmar för att boka en tid
              </p>
            </div>

            <div className="space-y-4">
              {/* Summary */}
              <div className="bg-black/5 rounded-xl p-4 space-y-3">
                <h3 className="font-sora font-semibold text-sm text-black">Sammanfattning</h3>
                <div className="grid grid-cols-2 gap-2 text-sm font-inter">
                  <span className="text-black/60">Företag:</span>
                  <span className="text-black font-medium">{formData.companyName}</span>
                  <span className="text-black/60">Org.nr:</span>
                  <span className="text-black">{formData.organizationNumber}</span>
                  <span className="text-black/60">Kontakt:</span>
                  <span className="text-black">{formData.contactName}</span>
                  <span className="text-black/60">E-post:</span>
                  <span className="text-black">{formData.email}</span>
                  {formData.phone && (
                    <>
                      <span className="text-black/60">Telefon:</span>
                      <span className="text-black">{formData.phone}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Selected Package */}
              {formData.selectedPackage && (
                <div className="bg-black rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Package className="w-5 h-5 text-white" />
                    <h3 className="font-sora font-semibold text-sm text-white">Valt paket</h3>
                  </div>
                  <p className="font-sora font-bold text-lg text-white">{formData.selectedPackage.name}</p>
                  <p className="text-white/80 text-sm font-inter">
                    {formData.selectedPackage.monthly_price.toLocaleString('sv-SE')} kr/mån • {formData.selectedPackage.company_type === 'AB' ? 'Aktiebolag' : 'Enskild firma'}
                  </p>
                </div>
              )}

              {/* Additional Info */}
              <div>
                <Label htmlFor="additionalInfo" className="font-inter font-semibold text-sm mb-2 block text-black">
                  Ytterligare information <span className="text-black/50 font-normal">(valfritt)</span>
                </Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  placeholder="Finns det något specifikt ni vill diskutera?"
                  rows={4}
                  className="bg-white border-2 border-black/10 focus:border-black rounded-xl resize-none font-inter"
                />
              </div>

              {/* What happens next */}
              <div className="bg-black/5 rounded-xl p-4">
                <h3 className="font-sora font-semibold text-sm text-black mb-2">Vad händer nu?</h3>
                <ul className="space-y-2 text-sm font-inter text-black/70">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                    <span>Vi skickar en bekräftelse till din e-post</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                    <span>Vi kontaktar dig inom 24 timmar för att boka tid</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                    <span>30-45 min kostnadsfri konsultation via Teams</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.organizationNumber && formData.industry &&
               formData.companySize && formData.contactName && formData.email;
      case 2:
        return formData.currentSituation.length > 0 && formData.challenges.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      {showConfirmation && submittedData && (
        <BookingConfirmation
          bookingData={{
            contactName: submittedData.contactName,
            email: submittedData.email,
            phone: submittedData.phone,
            companyName: submittedData.companyName,
            bookingDate: null,
            selectedTime: "",
            selectedPackage: submittedData.selectedPackage
          }}
          onClose={() => setShowConfirmation(false)}
        />
      )}

      <div className="w-full bg-white border-2 border-black/10 rounded-2xl">
        <div className="p-8 border-b border-black/10">
          <h3 className="font-sora font-bold text-center text-2xl text-black mb-6">
            Boka kostnadsfri konsultation
          </h3>

          {formData.selectedPackage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black rounded-xl p-4 border-2 border-black relative mb-6"
            >
              <button
                onClick={removeSelectedPackage}
                className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3 text-white" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 pr-8">
                  <h4 className="font-sora font-semibold text-sm text-white">
                    Valt paket: {formData.selectedPackage.name}
                  </h4>
                  <p className="text-xs text-white/70 font-inter">
                    {formData.selectedPackage.monthly_price.toLocaleString('sv-SE')} kr/mån • {formData.selectedPackage.company_type}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-inter text-black/70">
              <span>Steg {currentStep} av {totalSteps}</span>
              <span>{Math.round(progress)}% klart</span>
            </div>
            <div className="h-2 bg-black/5 rounded-full relative">
              <motion.div
                className="h-full bg-black rounded-full absolute left-0 top-0"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          <div className="flex justify-between gap-4 pt-6 mt-6 border-t border-black/10">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              variant="outline"
              className="flex items-center space-x-2 rounded-full border-2 border-black/10 hover:border-black hover:bg-black hover:text-white transition-all duration-300 font-inter font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Föregående</span>
            </Button>

            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="font-inter font-semibold rounded-full bg-black text-white hover:bg-black/90 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Nästa</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="font-inter font-semibold rounded-full bg-black text-white hover:bg-black/90 transition-all duration-300 flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Skickar...</span>
                  </>
                ) : (
                  <>
                    <span>Skicka förfrågan</span>
                    <CheckCircle className="w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
