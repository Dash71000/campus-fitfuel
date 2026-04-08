import { UserProfile, calculateBMI, calculateCalories, getMacros } from '@/lib/fitnessUtils';
import { getWorkoutPlan, DayPlan } from '@/lib/workoutPlans';
import { getDietPlan, getBudgetTips, DayMeals } from '@/lib/dietPlans';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User, Dumbbell, Utensils, Lightbulb, AlertTriangle, ChevronLeft,
  Flame, Apple, Droplets, Moon, Target, Zap, Download
} from 'lucide-react';
import { generateFitnessPDF } from '@/lib/generatePDF';

interface ResultsViewProps {
  profile: UserProfile;
  onBack: () => void;
}

const ResultsView = ({ profile, onBack }: ResultsViewProps) => {
  const bmiResult = calculateBMI(profile.height, profile.weight);
  const dailyCalories = calculateCalories(profile);
  const macros = getMacros(dailyCalories, profile.fitnessGoal);
  const workoutPlan = getWorkoutPlan(profile);
  const dietPlan = getDietPlan(profile);
  const budgetTips = getBudgetTips(profile.budget);

  const goalLabels = {
    'fat-loss': '🔥 Fat Loss',
    'muscle-gain': '💪 Muscle Gain',
    'maintenance': '⚖️ Maintenance',
  };

  return (
    <div className="min-h-screen py-8 px-4 pb-20">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
              <ChevronLeft className="w-4 h-4" />
              Create New Plan
            </Button>
            <Button size="sm" onClick={() => generateFitnessPDF(profile)} className="gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Your Personalized <span className="text-gradient">Fitness Plan</span>
          </h1>
          <p className="text-muted-foreground mt-2">Based on your inputs, here's your complete guide</p>
        </div>

        {/* User Profile Summary */}
        <Card variant="gradient" className="mb-8 animate-slide-up">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <CardTitle>Your Profile Summary</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-6">
              {/* BMI Card */}
              <div className="text-center p-4 rounded-xl bg-card shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">BMI</p>
                <p className={`text-3xl font-bold ${bmiResult.color}`}>{bmiResult.bmi}</p>
                <p className={`text-sm font-medium ${bmiResult.color}`}>{bmiResult.category}</p>
              </div>

              {/* Daily Calories */}
              <div className="text-center p-4 rounded-xl bg-card shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Daily Calories</p>
                <p className="text-3xl font-bold text-primary">{dailyCalories}</p>
                <p className="text-sm text-muted-foreground">kcal/day</p>
              </div>

              {/* Goal */}
              <div className="text-center p-4 rounded-xl bg-card shadow-sm">
                <p className="text-sm text-muted-foreground mb-1">Your Goal</p>
                <p className="text-2xl font-bold">{goalLabels[profile.fitnessGoal]}</p>
              </div>
            </div>

            {/* Macros */}
            <div className="mt-6 p-4 rounded-xl gradient-soft">
              <p className="text-sm font-medium mb-3">Daily Macro Targets</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{macros.protein}g</p>
                  <p className="text-xs text-muted-foreground">Protein</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-500">{macros.carbs}g</p>
                  <p className="text-xs text-muted-foreground">Carbs</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">{macros.fat}g</p>
                  <p className="text-xs text-muted-foreground">Fat</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Workout & Diet */}
        <Tabs defaultValue="workout" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-12">
            <TabsTrigger value="workout" className="gap-2 text-base">
              <Dumbbell className="w-4 h-4" />
              Workout Plan
            </TabsTrigger>
            <TabsTrigger value="diet" className="gap-2 text-base">
              <Utensils className="w-4 h-4" />
              Diet Plan
            </TabsTrigger>
          </TabsList>

          {/* Workout Tab */}
          <TabsContent value="workout" className="space-y-4">
            <Card variant="soft" className="mb-4">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="font-medium">Equipment:</span>
                  <span className="text-muted-foreground capitalize">
                    {profile.equipment === 'none' ? 'Bodyweight Only' : profile.equipment}
                  </span>
                </div>
              </CardContent>
            </Card>

            {workoutPlan.map((day, index) => (
              <WorkoutDayCard key={index} day={day} />
            ))}

            <Card variant="outline" className="mt-6">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Sunday:</strong> Complete rest day. Focus on sleep and recovery.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Diet Tab */}
          <TabsContent value="diet" className="space-y-4">
            <Card variant="soft" className="mb-4">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Apple className="w-4 h-4 text-primary" />
                    <span className="font-medium">Diet:</span>
                    <span className="text-muted-foreground capitalize">{profile.dietPreference}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-accent" />
                    <span className="font-medium">Budget:</span>
                    <span className="text-muted-foreground">₹{profile.budget}/day</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <DietPlanSection meals={dietPlan} />

            {/* Budget Tips */}
            <Card variant="elevated" className="mt-6">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-500" />
                  <CardTitle className="text-lg">Budget-Friendly Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {budgetTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Weekly Tips */}
        <Card variant="gradient" className="mt-8">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <CardTitle>Weekly Tips for Success</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Droplets, title: 'Stay Hydrated', desc: 'Drink 3-4 liters of water daily. Carry a bottle to class!' },
                { icon: Moon, title: 'Prioritize Sleep', desc: '7-8 hours of sleep is crucial for muscle recovery and focus.' },
                { icon: Target, title: 'Be Consistent', desc: "Progress takes time. Don't skip workouts, even short ones count!" },
                { icon: Zap, title: 'Stay Motivated', desc: 'Track your progress, celebrate small wins, and find a workout buddy.' },
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-card">
                  <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center shrink-0">
                    <tip.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{tip.title}</p>
                    <p className="text-sm text-muted-foreground">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card variant="outline" className="mt-8 border-amber-200 bg-amber-50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-800">Disclaimer</p>
              <p className="text-sm text-amber-700">
                This plan is for general fitness guidance only and does not constitute medical advice. 
                Consult a healthcare professional before starting any new diet or exercise program, 
                especially if you have pre-existing health conditions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const WorkoutDayCard = ({ day }: { day: DayPlan }) => (
  <Card variant="elevated" className="overflow-hidden">
    <CardHeader className="pb-3 gradient-hero">
      <div className="flex justify-between items-center">
        <CardTitle className="text-primary-foreground">{day.day}</CardTitle>
        <span className="text-sm text-primary-foreground/80">{day.focus}</span>
      </div>
    </CardHeader>
    <CardContent className="p-0">
      <div className="divide-y divide-border">
        {day.exercises.map((exercise, index) => (
          <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{exercise.name}</p>
                {exercise.alternative && (
                  <p className="text-xs text-muted-foreground">
                    Alt: {exercise.alternative}
                  </p>
                )}
              </div>
              <div className="text-right text-sm">
                <p className="font-medium">{exercise.sets} × {exercise.reps}</p>
                <p className="text-muted-foreground">Rest: {exercise.rest}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const DietPlanSection = ({ meals }: { meals: DayMeals }) => (
  <div className="space-y-4">
    {Object.entries(meals).map(([key, meal]) => (
      <Card key={key} variant="elevated">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{meal.name}</CardTitle>
            <span className="text-sm font-medium text-primary">{meal.calories} kcal</span>
          </div>
          <CardDescription className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1">
            {meal.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-primary mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
          {meal.hostelAlternative && (
            <div className="mt-3 p-3 rounded-lg bg-muted">
              <p className="text-xs text-muted-foreground">
                <strong>Hostel/Mess Option:</strong> {meal.hostelAlternative}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
);

export default ResultsView;
