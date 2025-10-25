import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Calendar, CheckCircle, Package, X, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import DateTimeSelector from "@/components/DateTimeSelector";
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
  selectedDate: Date | null;
  selectedTime: string;
  additionalInfo: string;
  selectedPackage?: SelectedPackage | null;
}

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);
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
    selectedDate: null,
    selectedTime: "",
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

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
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
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({ ...prev, selectedDate: date }));
  };

  const handleTimeChange = (time: string) => {
    setFormData(prev => ({ ...prev, selectedTime: time }));
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
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const bookingDateTime = formData.selectedDate && formData.selectedTime
        ? new Date(formData.selectedDate.toISOString().split('T')[0] + 'T' + formData.selectedTime)
        : null;

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
        booking_date: bookingDateTime?.toISOString() || null,
        additional_info: formData.additionalInfo || null,
        selected_package_id: formData.selectedPackage?.id || null,
        status: 'pending'
      };

      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) {
        console.error('Booking submission error:', error);
        toast({
          title: "Fel vid bokning",
          description: "Ett fel uppstod när vi försökte spara din bokning. Försök igen.",
          variant: "destructive"
        });
        return;
      }

      try {
        const { error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            email: formData.email,
            name: formData.contactName,
            companyName: formData.companyName,
            bookingDate: bookingDateTime?.toISOString() || null
          }
        });

        if (emailError) {
          console.error('Email send error:', emailError);
        }
      } catch (emailError) {
        console.error('Email function error:', emailError);
      }

      setSubmittedData({...formData});
      setShowConfirmation(true);

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
          selectedDate: null,
          selectedTime: "",
          additionalInfo: "",
          selectedPackage: null
        });
        setCurrentStep(1);
        localStorage.removeItem('selectedPackage');
      }, 500);

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Fel vid bokning",
        description: "Ett oväntat fel uppstod. Försök igen.",
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
                  className="h-12 bg-white border-2 border-black/10 focus:border-black rounded-xl font-inter"
                />
              </div>

              <div>
                <Label htmlFor="organizationNumber" className="font-inter font-semibold text-sm mb-2 block text-black">
                  Organisationsnummer *
                </Label>
                <Input
                  id="organizationNumber"
                  value={formData.organizationNumber}
                  onChange={(e) => handleInputChange("organizationNumber", e.target.value)}
                  placeholder="123456-7890"
                  className="h-12 bg-white border-2 border-black/10 focus:border-black rounded-xl font-inter"
                />
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
                  className="h-12 bg-white border-2 border-black/10 focus:border-black rounded-xl font-inter"
                />
              </div>

              <div>
                <Label htmlFor="companySize" className="font-inter font-semibold text-sm mb-2 block text-black">
                  Företagsstorlek *
                </Label>
                <select
                  id="companySize"
                  value={formData.companySize}
                  onChange={(e) => handleInputChange("companySize", e.target.value)}
                  className="w-full h-12 rounded-xl border-2 border-black/10 focus:border-black bg-white px-4 font-inter text-sm"
                >
                  <option value="">Välj företagsstorlek</option>
                  <option value="1-5">1-5 anställda</option>
                  <option value="6-20">6-20 anställda</option>
                  <option value="21-50">21-50 anställda</option>
                  <option value="51+">51+ anställda</option>
                </select>
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
                      className="h-12 bg-white border-2 border-black/10 focus:border-black rounded-xl font-inter"
                    />
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
                      className="h-12 bg-white border-2 border-black/10 focus:border-black rounded-xl font-inter"
                    />
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
                <p className="text-xs text-black/60 mt-2 font-inter">
                  {formData.currentSituation.length}/3 valda
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
                <p className="text-xs text-black/60 mt-2 font-inter">
                  {formData.challenges.length}/3 valda
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
          >
            <DateTimeSelector
              selectedDate={formData.selectedDate}
              selectedTime={formData.selectedTime}
              onDateChange={handleDateChange}
              onTimeChange={handleTimeChange}
            />
          </motion.div>
        );

      case 4:
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
                Slutför din bokning
              </h2>
              <p className="font-inter text-black/70 text-sm">
                {formData.selectedPackage
                  ? 'Vi diskuterar ditt valda paket och kontaktar er inom 24 timmar för att bekräfta tiden'
                  : 'Vi kontaktar er inom 24 timmar för att bekräfta tiden'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="additionalInfo" className="font-inter font-semibold text-sm mb-2 block text-black">
                  Ytterligare information (valfritt)
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

              {formData.selectedDate && formData.selectedTime && (
                <div className="bg-black rounded-xl p-6 border-2 border-black">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <Calendar className="w-5 h-5 text-white" />
                    <h3 className="font-sora font-semibold text-base text-white">Bokad tid</h3>
                  </div>
                  <p className="font-inter text-sm text-white/90 text-center">
                    {formData.selectedDate.toLocaleDateString('sv-SE', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} kl. {formData.selectedTime.slice(0, 5)}
                  </p>
                </div>
              )}

              {formData.selectedPackage && (
                <div className="bg-black rounded-xl p-6 border-2 border-black">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <Package className="w-5 h-5 text-white" />
                    <h3 className="font-sora font-semibold text-base text-white">Valt paket</h3>
                  </div>
                  <div className="text-center">
                    <p className="font-sora font-semibold text-lg text-white">{formData.selectedPackage.name}</p>
                    <p className="text-2xl font-bold text-white font-sora">
                      {formData.selectedPackage.monthly_price.toLocaleString('sv-SE')} kr/mån
                    </p>
                    <p className="text-xs text-white/70 mt-1 font-inter">
                      För {formData.selectedPackage.company_type === 'AB' ? 'Aktiebolag' : 'Enskild firma'}
                    </p>
                  </div>
                </div>
              )}
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
        return formData.selectedDate && formData.selectedTime;
      case 4:
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
            bookingDate: submittedData.selectedDate,
            selectedTime: submittedData.selectedTime,
            selectedPackage: submittedData.selectedPackage
          }}
          onClose={() => setShowConfirmation(false)}
        />
      )}

      <div className="w-full bg-white border-2 border-black/10 rounded-2xl overflow-hidden">
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
            <div className="h-2 bg-black/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black"
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
                <span>{isSubmitting ? "Skickar..." : "Skicka ansökan"}</span>
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
