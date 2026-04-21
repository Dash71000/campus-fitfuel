import { UserProfile } from './fitnessUtils';

export interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  alternative?: string;
}

export interface DayPlan {
  day: string;
  focus: string;
  exercises: Exercise[];
}

const noEquipmentExercises: DayPlan[] = [
  {
    day: 'Monday',
    focus: 'Full Body',
    exercises: [
      { name: 'Jumping Jacks', sets: 3, reps: '30 sec', rest: '30s' },
      { name: 'Push-ups', sets: 3, reps: '10-15', rest: '60s', alternative: 'Knee Push-ups' },
      { name: 'Bodyweight Squats', sets: 3, reps: '15-20', rest: '60s' },
      { name: 'Plank', sets: 3, reps: '30-45 sec', rest: '45s' },
      { name: 'Lunges', sets: 3, reps: '10 each leg', rest: '60s' },
    ],
  },
  {
    day: 'Tuesday',
    focus: 'Core & Cardio',
    exercises: [
      { name: 'High Knees', sets: 3, reps: '30 sec', rest: '30s' },
      { name: 'Mountain Climbers', sets: 3, reps: '20', rest: '45s' },
      { name: 'Bicycle Crunches', sets: 3, reps: '20', rest: '45s' },
      { name: 'Burpees', sets: 3, reps: '8-10', rest: '60s', alternative: 'Step-back Burpees' },
      { name: 'Dead Bug', sets: 3, reps: '10 each side', rest: '45s' },
    ],
  },
  {
    day: 'Wednesday',
    focus: 'Rest/Light Walk',
    exercises: [
      { name: 'Light Walking', sets: 1, reps: '20-30 min', rest: '-' },
      { name: 'Stretching', sets: 1, reps: '10 min', rest: '-' },
    ],
  },
  {
    day: 'Thursday',
    focus: 'Upper Body',
    exercises: [
      { name: 'Diamond Push-ups', sets: 3, reps: '8-12', rest: '60s', alternative: 'Regular Push-ups' },
      { name: 'Pike Push-ups', sets: 3, reps: '8-10', rest: '60s' },
      { name: 'Tricep Dips (Chair)', sets: 3, reps: '10-15', rest: '60s' },
      { name: 'Superman Hold', sets: 3, reps: '30 sec', rest: '45s' },
      { name: 'Arm Circles', sets: 3, reps: '20 each direction', rest: '30s' },
    ],
  },
  {
    day: 'Friday',
    focus: 'Lower Body',
    exercises: [
      { name: 'Jump Squats', sets: 3, reps: '12-15', rest: '60s', alternative: 'Regular Squats' },
      { name: 'Glute Bridges', sets: 3, reps: '15-20', rest: '45s' },
      { name: 'Wall Sit', sets: 3, reps: '30-45 sec', rest: '60s' },
      { name: 'Calf Raises', sets: 3, reps: '20', rest: '30s' },
      { name: 'Single Leg Deadlift', sets: 3, reps: '10 each leg', rest: '60s' },
    ],
  },
  {
    day: 'Saturday',
    focus: 'HIIT Circuit',
    exercises: [
      { name: 'Squat Jumps', sets: 4, reps: '20 sec on, 10 sec off', rest: '60s between rounds' },
      { name: 'Push-ups', sets: 4, reps: '20 sec on, 10 sec off', rest: '-' },
      { name: 'High Knees', sets: 4, reps: '20 sec on, 10 sec off', rest: '-' },
      { name: 'Plank', sets: 4, reps: '20 sec on, 10 sec off', rest: '-' },
    ],
  },
];

const homeEquipmentExercises: DayPlan[] = [
  {
    day: 'Monday',
    focus: 'Push Day',
    exercises: [
      { name: 'Dumbbell Chest Press', sets: 4, reps: '10-12', rest: '90s' },
      { name: 'Dumbbell Shoulder Press', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Dumbbell Tricep Kickbacks', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Push-ups', sets: 3, reps: 'To failure', rest: '60s' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45s' },
    ],
  },
  {
    day: 'Tuesday',
    focus: 'Pull Day',
    exercises: [
      { name: 'Dumbbell Rows', sets: 4, reps: '10-12 each', rest: '90s' },
      { name: 'Resistance Band Pull-aparts', sets: 3, reps: '15-20', rest: '45s' },
      { name: 'Dumbbell Bicep Curls', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Dumbbell Shrugs', sets: 3, reps: '15', rest: '45s' },
      { name: 'Reverse Flyes', sets: 3, reps: '12-15', rest: '60s' },
    ],
  },
  {
    day: 'Wednesday',
    focus: 'Legs',
    exercises: [
      { name: 'Goblet Squats', sets: 4, reps: '12-15', rest: '90s' },
      { name: 'Dumbbell Lunges', sets: 3, reps: '10 each leg', rest: '60s' },
      { name: 'Romanian Deadlifts', sets: 3, reps: '12', rest: '60s' },
      { name: 'Calf Raises (Weighted)', sets: 3, reps: '20', rest: '45s' },
      { name: 'Glute Bridges (Weighted)', sets: 3, reps: '15', rest: '60s' },
    ],
  },
  {
    day: 'Thursday',
    focus: 'Rest/Active Recovery',
    exercises: [
      { name: 'Light Yoga/Stretching', sets: 1, reps: '20 min', rest: '-' },
      { name: 'Walking', sets: 1, reps: '20-30 min', rest: '-' },
    ],
  },
  {
    day: 'Friday',
    focus: 'Full Body',
    exercises: [
      { name: 'Dumbbell Thrusters', sets: 4, reps: '10-12', rest: '90s' },
      { name: 'Renegade Rows', sets: 3, reps: '8 each side', rest: '60s' },
      { name: 'Dumbbell Step-ups', sets: 3, reps: '10 each leg', rest: '60s' },
      { name: 'Dumbbell Floor Press', sets: 3, reps: '12', rest: '60s' },
      { name: 'Plank with Dumbbell Rows', sets: 3, reps: '8 each', rest: '60s' },
    ],
  },
  {
    day: 'Saturday',
    focus: 'Core & Cardio',
    exercises: [
      { name: 'Dumbbell Woodchops', sets: 3, reps: '12 each side', rest: '45s' },
      { name: 'Russian Twists', sets: 3, reps: '20', rest: '45s' },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec', rest: '30s' },
      { name: 'Dead Bug', sets: 3, reps: '10 each side', rest: '45s' },
      { name: 'Burpees', sets: 3, reps: '10', rest: '60s' },
    ],
  },
];

const gymExercises: DayPlan[] = [
  {
    day: 'Monday',
    focus: 'Chest & Triceps',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Overhead Tricep Extension', sets: 3, reps: '12', rest: '60s' },
    ],
  },
  {
    day: 'Tuesday',
    focus: 'Back & Biceps',
    exercises: [
      { name: 'Lat Pulldowns', sets: 4, reps: '10-12', rest: '90s' },
      { name: 'Seated Cable Rows', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Barbell Rows', sets: 3, reps: '10', rest: '90s' },
      { name: 'Face Pulls', sets: 3, reps: '15', rest: '45s' },
      { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
      { name: 'Hammer Curls', sets: 3, reps: '12', rest: '60s' },
    ],
  },
  {
    day: 'Wednesday',
    focus: 'Legs',
    exercises: [
      { name: 'Squats', sets: 4, reps: '8-10', rest: '120s' },
      { name: 'Leg Press', sets: 3, reps: '12', rest: '90s' },
      { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', rest: '90s' },
      { name: 'Leg Curls', sets: 3, reps: '12-15', rest: '60s' },
      { name: 'Calf Raises (Machine)', sets: 4, reps: '15-20', rest: '45s' },
    ],
  },
  {
    day: 'Thursday',
    focus: 'Shoulders & Abs',
    exercises: [
      { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '45s' },
      { name: 'Rear Delt Flyes', sets: 3, reps: '15', rest: '45s' },
      { name: 'Shrugs', sets: 3, reps: '12', rest: '60s' },
      { name: 'Cable Crunches', sets: 3, reps: '15', rest: '45s' },
      { name: 'Hanging Leg Raises', sets: 3, reps: '10-15', rest: '60s' },
    ],
  },
  {
    day: 'Friday',
    focus: 'Full Body/Compound',
    exercises: [
      { name: 'Deadlifts', sets: 4, reps: '5-6', rest: '180s' },
      { name: 'Pull-ups', sets: 3, reps: 'To failure', rest: '90s' },
      { name: 'Dips', sets: 3, reps: '10-15', rest: '90s' },
      { name: 'Lunges', sets: 3, reps: '10 each', rest: '60s' },
      { name: 'Plank', sets: 3, reps: '60 sec', rest: '45s' },
    ],
  },
  {
    day: 'Saturday',
    focus: 'Cardio & Core',
    exercises: [
      { name: 'Treadmill/Cycling', sets: 1, reps: '20-30 min', rest: '-' },
      { name: 'Battle Ropes', sets: 4, reps: '30 sec', rest: '30s' },
      { name: 'Russian Twists', sets: 3, reps: '20', rest: '45s' },
      { name: 'Planks (Various)', sets: 3, reps: '45 sec each', rest: '30s' },
    ],
  },
];

// Adjust a base plan based on user's fitness goal and activity level
const adaptPlanToGoal = (plan: DayPlan[], profile: UserProfile): DayPlan[] => {
  const { fitnessGoal, activityLevel, gender } = profile;

  return plan.map((day) => {
    const isRestDay = /rest/i.test(day.focus);
    const isCardioDay = /cardio|hiit/i.test(day.focus);

    let exercises = day.exercises.map((ex) => {
      // Skip modifying timed/duration exercises like "20-30 min" or "30 sec"
      const isTimed = /sec|min/i.test(ex.reps);

      let sets = ex.sets;
      let reps = ex.reps;
      let rest = ex.rest;

      if (!isRestDay && !isTimed) {
        if (fitnessGoal === 'muscle-gain') {
          // Heavier, lower reps, longer rest
          sets = Math.min(sets + 1, 5);
          reps = reps.replace(/(\d+)-(\d+)/, (_, a, b) => `${Math.max(6, +a - 2)}-${Math.max(8, +b - 3)}`);
          rest = rest === '-' ? rest : '90s';
        } else if (fitnessGoal === 'fat-loss') {
          // Higher reps, shorter rest for metabolic effect
          reps = reps.replace(/(\d+)-(\d+)/, (_, a, b) => `${+a + 3}-${+b + 5}`);
          rest = rest === '-' ? rest : '30-45s';
        }
      }

      // Low activity beginners: reduce one set on non-rest days
      if (!isRestDay && activityLevel === 'low' && sets > 2) {
        sets = sets - 1;
      }
      // High activity: add intensity
      if (!isRestDay && activityLevel === 'high' && !isTimed) {
        sets = Math.min(sets + 1, 5);
      }

      return { ...ex, sets, reps, rest };
    });

    // Fat-loss: append a finisher cardio block on non-rest, non-cardio days
    if (fitnessGoal === 'fat-loss' && !isRestDay && !isCardioDay) {
      exercises = [
        ...exercises,
        { name: 'Finisher: Jump Rope / High Knees', sets: 3, reps: '45 sec', rest: '15s' },
      ];
    }

    // Muscle-gain: add a focused accessory burnout
    if (fitnessGoal === 'muscle-gain' && !isRestDay && !isCardioDay) {
      exercises = [
        ...exercises,
        { name: 'Burnout Set (last exercise, light weight)', sets: 1, reps: 'AMRAP', rest: '-' },
      ];
    }

    // Female-specific: add an extra glute/core accessory on lower body days
    if (gender === 'female' && /leg|lower/i.test(day.focus)) {
      exercises = [
        ...exercises,
        { name: 'Hip Thrusts', sets: 3, reps: '12-15', rest: '60s' },
      ];
    }

    return { ...day, exercises };
  });
};

export const getWorkoutPlan = (profile: UserProfile): DayPlan[] => {
  let basePlan: DayPlan[];
  switch (profile.equipment) {
    case 'gym':
      basePlan = gymExercises;
      break;
    case 'home':
      basePlan = homeEquipmentExercises;
      break;
    default:
      basePlan = noEquipmentExercises;
  }
  return adaptPlanToGoal(basePlan, profile);
};
