export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  fitnessGoal: 'fat-loss' | 'muscle-gain' | 'maintenance';
  activityLevel: 'low' | 'moderate' | 'high';
  equipment: 'none' | 'home' | 'gym';
  dietPreference: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'jain';
  budget: number;
  cookingAccess: 'none' | 'basic' | 'full';
  medicalConditions?: string;
}

export interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

export const calculateBMI = (height: number, weight: number): BMIResult => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  
  let category: string;
  let color: string;

  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'text-amber-500';
  } else if (bmi < 25) {
    category = 'Normal';
    color = 'text-primary';
  } else if (bmi < 30) {
    category = 'Overweight';
    color = 'text-amber-500';
  } else {
    category = 'Obese';
    color = 'text-destructive';
  }

  return { bmi: Math.round(bmi * 10) / 10, category, color };
};

export const calculateCalories = (profile: UserProfile): number => {
  // Harris-Benedict Equation
  let bmr: number;
  
  if (profile.gender === 'male') {
    bmr = 88.362 + (13.397 * profile.weight) + (4.799 * profile.height) - (5.677 * profile.age);
  } else {
    bmr = 447.593 + (9.247 * profile.weight) + (3.098 * profile.height) - (4.330 * profile.age);
  }

  // Activity multiplier
  const activityMultipliers = {
    low: 1.2,
    moderate: 1.55,
    high: 1.9,
  };

  let tdee = bmr * activityMultipliers[profile.activityLevel];

  // Adjust for goal
  if (profile.fitnessGoal === 'fat-loss') {
    tdee -= 400;
  } else if (profile.fitnessGoal === 'muscle-gain') {
    tdee += 300;
  }

  return Math.round(tdee);
};

export const getMacros = (calories: number, goal: string) => {
  let protein: number, carbs: number, fat: number;

  if (goal === 'fat-loss') {
    protein = Math.round((calories * 0.35) / 4);
    carbs = Math.round((calories * 0.35) / 4);
    fat = Math.round((calories * 0.30) / 9);
  } else if (goal === 'muscle-gain') {
    protein = Math.round((calories * 0.30) / 4);
    carbs = Math.round((calories * 0.45) / 4);
    fat = Math.round((calories * 0.25) / 9);
  } else {
    protein = Math.round((calories * 0.25) / 4);
    carbs = Math.round((calories * 0.50) / 4);
    fat = Math.round((calories * 0.25) / 9);
  }

  return { protein, carbs, fat };
};
