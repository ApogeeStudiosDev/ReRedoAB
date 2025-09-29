import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Calendar, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import DateTimeSelector from "@/components/DateTimeSelector";
import type { Database } from "@/integrations/supabase/types";

type BookingInsert = Database['public']['Tables']['bookings']['Insert'];

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
}

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    additionalInfo: ""
  });

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
      // Combine date and time into a single datetime
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

      // Call email automation function
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

      toast({
        title: "Bokning skickad!",
        description: "Vi har mottagit din förfrågan och kontaktar dig inom 24 timmar.",
        variant: "default"
      });

      // Reset form
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
        additionalInfo: ""
      });
      setCurrentStep(1);
      
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
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="font-urbanist font-bold text-lg text-foreground mb-2">
                Företagsinformation
              </h2>
              <p className="text-foreground/70 font-montserrat text-sm">
                Berätta om ditt företag så kan vi förbereda oss inför mötet
              </p>
            </div>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="companyName" className="font-montserrat font-medium text-sm mb-1 block">
                  Företagsnamn *
                </Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  placeholder="Ditt företags namn"
                  className="bg-background/80 border-border/40 h-10"
                />
              </div>

              <div>
                <Label htmlFor="organizationNumber" className="font-montserrat font-medium text-sm mb-1 block">
                  Organisationsnummer *
                </Label>
                <Input
                  id="organizationNumber"
                  value={formData.organizationNumber}
                  onChange={(e) => handleInputChange("organizationNumber", e.target.value)}
                  placeholder="123456-7890"
                  className="bg-background/80 border-border/40 h-10"
                />
              </div>

              <div>
                <Label htmlFor="industry" className="font-montserrat font-medium text-sm mb-1 block">
                  Bransch *
                </Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  placeholder="T.ex. IT, handel, konsulting"
                  className="bg-background/80 border-border/40 h-10"
                />
              </div>

              <div>
                <Label htmlFor="companySize" className="font-montserrat font-medium text-sm mb-1 block">
                  Företagsstorlek *
                </Label>
                <select
                  id="companySize"
                  value={formData.companySize}
                  onChange={(e) => handleInputChange("companySize", e.target.value)}
                  className="w-full h-10 rounded-md border border-border/40 bg-background/80 px-3 py-2 text-sm"
                >
                  <option value="">Välj företagsstorlek</option>
                  <option value="1-5">1-5 anställda</option>
                  <option value="6-20">6-20 anställda</option>
                  <option value="21-50">21-50 anställda</option>
                  <option value="51+">51+ anställda</option>
                </select>
              </div>

              <div className="border-t border-border/20 pt-3">
                <h3 className="font-urbanist font-semibold text-base mb-2">Kontaktuppgifter</h3>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="contactName" className="font-montserrat font-medium text-sm mb-1 block">
                      Kontaktperson *
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      placeholder="Ditt namn"
                      className="bg-background/80 border-border/40 h-10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-montserrat font-medium text-sm mb-1 block">
                      E-post *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="din@email.se"
                      className="bg-background/80 border-border/40 h-10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-montserrat font-medium text-sm mb-1 block">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="070-123 45 67"
                      className="bg-background/80 border-border/40 h-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="font-urbanist font-bold text-lg text-foreground mb-2">
                Er nuvarande situation
              </h2>
              <p className="text-foreground/70 font-montserrat text-sm">
                Välj upp till 3 alternativ som beskriver er situation
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="font-montserrat font-medium mb-2 block text-sm">
                  Hur hanterar ni ekonomi idag? *
                </Label>
                <div className="space-y-2">
                  {currentSituationOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleMultiSelect('currentSituation', option)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.currentSituation.includes(option)
                          ? "border-accent bg-accent/10"
                          : "border-border/40 hover:border-accent/50"
                      } ${
                        formData.currentSituation.length >= 3 && !formData.currentSituation.includes(option)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.currentSituation.includes(option)
                            ? "border-accent bg-accent"
                            : "border-border/40"
                        }`}>
                          {formData.currentSituation.includes(option) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="font-montserrat text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-foreground/60 mt-2">
                  {formData.currentSituation.length}/3 valda
                </p>
              </div>

              <div>
                <Label className="font-montserrat font-medium mb-2 block text-sm">
                  Vilka utmaningar vill ni lösa? *
                </Label>
                <div className="space-y-2">
                  {challengeOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleMultiSelect('challenges', option)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        formData.challenges.includes(option)
                          ? "border-accent bg-accent/10"
                          : "border-border/40 hover:border-accent/50"
                      } ${
                        formData.challenges.length >= 3 && !formData.challenges.includes(option)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          formData.challenges.includes(option)
                            ? "border-accent bg-accent"
                            : "border-border/40"
                        }`}>
                          {formData.challenges.includes(option) && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="font-montserrat text-sm">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-foreground/60 mt-2">
                  {formData.challenges.length}/3 valda
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <DateTimeSelector
            selectedDate={formData.selectedDate}
            selectedTime={formData.selectedTime}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
          />
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="font-urbanist font-bold text-lg text-foreground mb-2">
                Slutför din bokning
              </h2>
              <p className="text-foreground/70 font-montserrat text-sm">
                Vi kontaktar er inom 24 timmar för att bekräfta tiden
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="additionalInfo" className="font-montserrat font-medium text-sm mb-2 block">
                  Ytterligare information (valfritt)
                </Label>
                <Textarea
                  id="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  placeholder="Finns det något specifikt ni vill diskutera?"
                  rows={3}
                  className="bg-background/80 border-border/40 resize-none"
                />
              </div>

              {formData.selectedDate && formData.selectedTime && (
                <div className="bg-accent/5 backdrop-blur-sm rounded-xl p-4 border border-accent/20">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    <h3 className="font-urbanist font-semibold text-base">Bokad tid</h3>
                  </div>
                  <p className="font-montserrat text-sm text-foreground/70 text-center">
                    {formData.selectedDate.toLocaleDateString('sv-SE', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })} kl. {formData.selectedTime.slice(0, 5)}
                  </p>
                </div>
              )}
            </div>
          </div>
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
    <Card className="w-full bg-card/60 backdrop-blur-sm border-border/20">
      <CardHeader className="pb-3">
        <CardTitle className="font-urbanist font-bold text-center text-lg">
          Boka kostnadsfri konsultation
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-montserrat text-foreground/70">
            <span>Steg {currentStep} av {totalSteps}</span>
            <span>{Math.round(progress)}% klart</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {renderStep()}
        
        <div className="flex justify-between gap-3 pt-3 border-t border-border/20">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2 h-9"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Föregående</span>
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="glass-button-dark-green-cta text-white font-urbanist font-semibold px-4 h-9 rounded-full border-none flex items-center space-x-2"
            >
              <span>Nästa</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="glass-button-dark-green-cta text-white font-urbanist font-semibold px-4 h-9 rounded-full border-none flex items-center space-x-2"
            >
              <span>{isSubmitting ? "Skickar..." : "Skicka ansökan"}</span>
              <CheckCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
