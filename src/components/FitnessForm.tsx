import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserProfile } from '@/lib/fitnessUtils';
import { ChevronLeft, ChevronRight, User, Target, Dumbbell, Utensils, Wallet, AlertCircle } from 'lucide-react';

interface FitnessFormProps {
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

const FitnessForm = ({ onSubmit, onBack }: FitnessFormProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    age: '',
    gender: 'male' as 'male' | 'female' | 'other',
    height: '',
    weight: '',
    fitnessGoal: 'maintenance' as 'fat-loss' | 'muscle-gain' | 'maintenance',
    activityLevel: 'moderate' as 'low' | 'moderate' | 'high',
    equipment: 'none' as 'none' | 'home' | 'gym',
    dietPreference: 'vegetarian' as 'vegetarian' | 'non-vegetarian' | 'vegan' | 'jain',
    budget: '',
    cookingAccess: 'basic' as 'none' | 'basic' | 'full',
    medicalConditions: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const profile: UserProfile = {
      age: parseInt(formData.age) || 20,
      gender: formData.gender,
      height: parseFloat(formData.height) || 170,
      weight: parseFloat(formData.weight) || 65,
      fitnessGoal: formData.fitnessGoal,
      activityLevel: formData.activityLevel,
      equipment: formData.equipment,
      dietPreference: formData.dietPreference,
      budget: parseInt(formData.budget) || 100,
      cookingAccess: formData.cookingAccess,
      medicalConditions: formData.medicalConditions || undefined,
    };
    onSubmit(profile);
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.age && formData.height && formData.weight;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return formData.budget;
      case 5:
        return true;
      default:
        return true;
    }
  };

  const stepIcons = [User, Target, Dumbbell, Utensils, AlertCircle];
  const stepTitles = ['Basic Info', 'Your Goals', 'Equipment', 'Diet & Budget', 'Health Info'];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              Step {step} of {totalSteps}
            </span>
          </div>
          
          <div className="flex gap-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                  i < step ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-6">
          {(() => {
            const Icon = stepIcons[step - 1];
            return (
              <>
                <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{stepTitles[step - 1]}</h2>
                  <p className="text-muted-foreground text-sm">Fill in the details below</p>
                </div>
              </>
            );
          })()}
        </div>

        {/* Form Card */}
        <Card variant="elevated" className="animate-fade-in">
          <CardContent className="p-6 sm:p-8">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age (years)</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g., 20"
                      value={formData.age}
                      onChange={(e) => updateField('age', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(v) => updateField('gender', v)}
                      className="flex gap-4"
                    >
                      {[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                        { value: 'other', label: 'Other' },
                      ].map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={option.value} />
                          <Label htmlFor={option.value} className="cursor-pointer">{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="e.g., 170"
                      value={formData.height}
                      onChange={(e) => updateField('height', e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="e.g., 65"
                      value={formData.weight}
                      onChange={(e) => updateField('weight', e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Goals */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Fitness Goal</Label>
                  <RadioGroup
                    value={formData.fitnessGoal}
                    onValueChange={(v) => updateField('fitnessGoal', v)}
                    className="grid gap-3"
                  >
                    {[
                      { value: 'fat-loss', label: '🔥 Fat Loss', desc: 'Reduce body fat while maintaining muscle' },
                      { value: 'muscle-gain', label: '💪 Muscle Gain', desc: 'Build muscle mass and strength' },
                      { value: 'maintenance', label: '⚖️ Maintenance', desc: 'Stay fit and maintain current weight' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.fitnessGoal === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={option.value} className="mt-1" />
                        <div>
                          <span className="font-semibold">{option.label}</span>
                          <p className="text-sm text-muted-foreground">{option.desc}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Activity Level</Label>
                  <RadioGroup
                    value={formData.activityLevel}
                    onValueChange={(v) => updateField('activityLevel', v)}
                    className="grid gap-3"
                  >
                    {[
                      { value: 'low', label: '🚶 Low', desc: 'Mostly sitting, light walking' },
                      { value: 'moderate', label: '🏃 Moderate', desc: 'Regular movement, some exercise' },
                      { value: 'high', label: '⚡ High', desc: 'Very active, daily exercise' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.activityLevel === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={option.value} className="mt-1" />
                        <div>
                          <span className="font-semibold">{option.label}</span>
                          <p className="text-sm text-muted-foreground">{option.desc}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 3: Equipment */}
            {step === 3 && (
              <div className="space-y-3">
                <Label className="text-base">Available Equipment</Label>
                <RadioGroup
                  value={formData.equipment}
                  onValueChange={(v) => updateField('equipment', v)}
                  className="grid gap-3"
                >
                  {[
                    { value: 'none', label: '🏠 No Equipment', desc: 'Bodyweight exercises only (hostel/room)' },
                    { value: 'home', label: '🏋️ Home Equipment', desc: 'Dumbbells, resistance bands, etc.' },
                    { value: 'gym', label: '💪 Gym Access', desc: 'Full gym with all equipment' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.equipment === option.value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <RadioGroupItem value={option.value} className="mt-1" />
                      <div>
                        <span className="font-semibold">{option.label}</span>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 4: Diet & Budget */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base">Diet Preference</Label>
                  <RadioGroup
                    value={formData.dietPreference}
                    onValueChange={(v) => updateField('dietPreference', v)}
                    className="grid sm:grid-cols-2 gap-3"
                  >
                    {[
                      { value: 'vegetarian', label: '🥬 Vegetarian' },
                      { value: 'non-vegetarian', label: '🍗 Non-Vegetarian' },
                      { value: 'vegan', label: '🌱 Vegan' },
                      { value: 'jain', label: '🪷 Jain' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.dietPreference === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={option.value} />
                        <span className="font-semibold">{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    Daily Food Budget (₹)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="e.g., 100"
                    value={formData.budget}
                    onChange={(e) => updateField('budget', e.target.value)}
                    className="h-12"
                  />
                  <p className="text-xs text-muted-foreground">Average spending on food per day</p>
                </div>

                <div className="space-y-3">
                  <Label className="text-base">Cooking Access</Label>
                  <RadioGroup
                    value={formData.cookingAccess}
                    onValueChange={(v) => updateField('cookingAccess', v)}
                    className="grid gap-3"
                  >
                    {[
                      { value: 'none', label: '🍽️ No Cooking', desc: 'Mess/canteen/outside food only' },
                      { value: 'basic', label: '🍳 Basic Cooking', desc: 'Induction, simple recipes' },
                      { value: 'full', label: '👨‍🍳 Full Kitchen', desc: 'Access to complete kitchen setup' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          formData.cookingAccess === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <RadioGroupItem value={option.value} className="mt-1" />
                        <div>
                          <span className="font-semibold">{option.label}</span>
                          <p className="text-sm text-muted-foreground">{option.desc}</p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 5: Health Info */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> This information helps us customize your plan. 
                    We don't provide medical advice - consult a doctor for health concerns.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medical">Any Medical Conditions? (Optional)</Label>
                  <Textarea
                    id="medical"
                    placeholder="e.g., Asthma, Knee injury, Diabetes, etc."
                    value={formData.medicalConditions}
                    onChange={(e) => updateField('medicalConditions', e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave blank if none. This helps us suggest safer exercise alternatives.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="gap-1">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
          ) : (
            <div />
          )}
          
          {step < totalSteps ? (
            <Button
              variant="hero"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="hero" onClick={handleSubmit} className="gap-2">
              Generate My Plan
              <Dumbbell className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitnessForm;
