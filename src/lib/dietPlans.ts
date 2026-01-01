import { UserProfile } from './fitnessUtils';

export interface Meal {
  name: string;
  items: string[];
  calories: string;
  hostelAlternative?: string;
}

export interface DayMeals {
  breakfast: Meal;
  midMorning: Meal;
  lunch: Meal;
  evening: Meal;
  dinner: Meal;
}

const vegetarianMeals = (budget: number, cooking: string): DayMeals => ({
  breakfast: {
    name: 'Power Breakfast',
    items: cooking === 'none' 
      ? ['2 Boiled Eggs or Paneer Sandwich', 'Banana', 'Glass of Milk/Chai']
      : ['Oats with Milk & Banana', '2 Boiled Eggs or Besan Chilla', 'Green Tea'],
    calories: '350-400',
    hostelAlternative: 'Mess paratha with curd + banana',
  },
  midMorning: {
    name: 'Snack',
    items: ['Handful of Peanuts/Chana', 'Apple or Guava'],
    calories: '150-200',
    hostelAlternative: 'Fruit from canteen',
  },
  lunch: {
    name: 'Balanced Lunch',
    items: cooking === 'none'
      ? ['Dal + Rice/Roti from Mess', 'Sabzi', 'Curd/Raita', 'Salad']
      : ['2 Chapati', 'Dal Fry', 'Mixed Vegetable Sabzi', 'Rice (1 katori)', 'Curd'],
    calories: '500-600',
    hostelAlternative: 'Regular mess thali with extra dal',
  },
  evening: {
    name: 'Pre-Workout Snack',
    items: budget >= 100 
      ? ['Banana', 'Handful of Almonds', 'Black Coffee (optional)']
      : ['Banana', 'Roasted Chana', 'Lemon Water'],
    calories: '150-200',
    hostelAlternative: 'Banana + biscuits from canteen',
  },
  dinner: {
    name: 'Light Dinner',
    items: cooking === 'none'
      ? ['Mess Roti/Rice', 'Dal', 'Paneer if available', 'Salad']
      : ['2 Roti', 'Palak Paneer or Chana Masala', 'Light Salad', 'Glass of Buttermilk'],
    calories: '400-500',
    hostelAlternative: 'Mess dinner + extra protein (paneer/egg)',
  },
});

const nonVegetarianMeals = (budget: number, cooking: string): DayMeals => ({
  breakfast: {
    name: 'Protein Breakfast',
    items: cooking === 'none'
      ? ['Egg Bhurji Sandwich', 'Banana', 'Glass of Milk']
      : ['3-4 Egg Omelette', 'Brown Bread', 'Banana', 'Tea'],
    calories: '400-450',
    hostelAlternative: 'Boiled eggs (2-3) + bread from canteen',
  },
  midMorning: {
    name: 'Snack',
    items: ['Boiled Eggs (2)', 'Any Seasonal Fruit'],
    calories: '180-220',
    hostelAlternative: 'Eggs from canteen + fruit',
  },
  lunch: {
    name: 'Power Lunch',
    items: cooking === 'none'
      ? ['Chicken Curry/Fish from Mess', 'Rice/Roti', 'Dal', 'Salad']
      : ['Chicken Breast (100g)', '2 Chapati', 'Dal', 'Rice (1 katori)', 'Raita'],
    calories: '550-650',
    hostelAlternative: 'Mess non-veg thali + extra chicken',
  },
  evening: {
    name: 'Pre-Workout Snack',
    items: budget >= 120
      ? ['Boiled Egg Whites (3)', 'Banana', 'Peanut Butter Toast']
      : ['Banana', 'Roasted Chana', 'Coconut Water'],
    calories: '200-250',
    hostelAlternative: 'Egg sandwich from canteen',
  },
  dinner: {
    name: 'Recovery Dinner',
    items: cooking === 'none'
      ? ['Grilled Chicken/Fish if available', 'Roti', 'Sabzi', 'Soup']
      : ['Chicken/Fish (150g)', '2 Roti', 'Mixed Vegetables', 'Soup'],
    calories: '450-550',
    hostelAlternative: 'Mess non-veg + light salad',
  },
});

const veganMeals = (budget: number, cooking: string): DayMeals => ({
  breakfast: {
    name: 'Plant Power Breakfast',
    items: cooking === 'none'
      ? ['Poha with Peanuts', 'Soy Milk', 'Banana']
      : ['Moong Dal Chilla', 'Fruit Bowl', 'Soy Milk or Almond Milk'],
    calories: '350-400',
    hostelAlternative: 'Poha/Upma from mess + banana',
  },
  midMorning: {
    name: 'Snack',
    items: ['Mixed Nuts (Peanuts, Almonds)', 'Seasonal Fruit'],
    calories: '180-220',
    hostelAlternative: 'Peanuts + fruit',
  },
  lunch: {
    name: 'Protein-Rich Lunch',
    items: cooking === 'none'
      ? ['Rajma/Chole from Mess', 'Rice', 'Salad', 'Sprouts if available']
      : ['Soya Chunks Curry', 'Brown Rice', 'Mixed Sprouts Salad', 'Chapati'],
    calories: '500-600',
    hostelAlternative: 'Mess rajma/chole + extra sprouts',
  },
  evening: {
    name: 'Pre-Workout Snack',
    items: ['Peanut Butter Banana', 'Coconut Water', 'Roasted Makhana'],
    calories: '200-250',
    hostelAlternative: 'Banana + peanuts',
  },
  dinner: {
    name: 'Light Dinner',
    items: cooking === 'none'
      ? ['Dal Tadka', 'Roti', 'Sabzi', 'Tofu if available']
      : ['Tofu Bhurji', '2 Roti', 'Dal', 'Steamed Vegetables'],
    calories: '400-500',
    hostelAlternative: 'Mess dal + sabzi + extra tofu',
  },
});

const jainMeals = (budget: number, cooking: string): DayMeals => ({
  breakfast: {
    name: 'Sattvic Breakfast',
    items: cooking === 'none'
      ? ['Sabudana Khichdi', 'Milk', 'Banana']
      : ['Moong Dal Dosa', 'Coconut Chutney', 'Fruit Bowl', 'Milk'],
    calories: '350-400',
    hostelAlternative: 'Upma (without onion) + milk + fruit',
  },
  midMorning: {
    name: 'Snack',
    items: ['Dry Fruits (Almonds, Cashews)', 'Fresh Fruit (no root vegetables)'],
    calories: '150-200',
    hostelAlternative: 'Dry fruits + apple/banana',
  },
  lunch: {
    name: 'Wholesome Lunch',
    items: cooking === 'none'
      ? ['Jain Thali from Outside', 'Rice', 'Kadhi', 'Cabbage Sabzi']
      : ['Paneer Sabzi (no onion-garlic)', '2 Phulka', 'Moong Dal', 'Rice'],
    calories: '500-600',
    hostelAlternative: 'Special request: dal + sabzi without root vegetables',
  },
  evening: {
    name: 'Pre-Workout Snack',
    items: ['Makhana (Fox Nuts)', 'Banana', 'Coconut Water'],
    calories: '150-200',
    hostelAlternative: 'Makhana packet + fruit',
  },
  dinner: {
    name: 'Light Sattvic Dinner',
    items: cooking === 'none'
      ? ['Simple Dal', 'Roti', 'Lauki/Tori Sabzi', 'Buttermilk']
      : ['Palak Paneer (Jain)', '2 Roti', 'Light Soup', 'Chaas'],
    calories: '400-450',
    hostelAlternative: 'Light dinner with allowed vegetables',
  },
});

export const getDietPlan = (profile: UserProfile): DayMeals => {
  const { dietPreference, budget, cookingAccess } = profile;

  switch (dietPreference) {
    case 'non-vegetarian':
      return nonVegetarianMeals(budget, cookingAccess);
    case 'vegan':
      return veganMeals(budget, cookingAccess);
    case 'jain':
      return jainMeals(budget, cookingAccess);
    default:
      return vegetarianMeals(budget, cookingAccess);
  }
};

export const getBudgetTips = (budget: number): string[] => {
  if (budget <= 80) {
    return [
      'Focus on mess food + protein additions like eggs and peanuts',
      'Buy bananas in bulk - cheapest and best fruit',
      'Roasted chana is your best friend - cheap and protein-rich',
      'Milk from local dairy is cheaper than packaged',
    ];
  } else if (budget <= 120) {
    return [
      'Mix mess food with outside protein sources',
      'Buy seasonal fruits for best value',
      'Consider buying paneer from local shops, not restaurants',
      'Peanut butter can be a great affordable protein source',
    ];
  } else {
    return [
      'You have flexibility - prioritize quality protein',
      'Consider meal prep on weekends',
      'Invest in good quality eggs and paneer',
      'Add variety with different fruits and nuts',
    ];
  }
};
