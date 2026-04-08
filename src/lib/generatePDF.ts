import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { UserProfile, calculateBMI, calculateCalories, getMacros } from './fitnessUtils';
import { getWorkoutPlan } from './workoutPlans';
import { getDietPlan, getBudgetTips } from './dietPlans';

export const generateFitnessPDF = (profile: UserProfile) => {
  const doc = new jsPDF();
  const bmi = calculateBMI(profile.height, profile.weight);
  const calories = calculateCalories(profile);
  const macros = getMacros(calories, profile.fitnessGoal);
  const workoutPlan = getWorkoutPlan(profile);
  const dietPlan = getDietPlan(profile);
  const budgetTips = getBudgetTips(profile.budget);

  const primaryColor: [number, number, number] = [20, 184, 166]; // teal
  const darkColor: [number, number, number] = [30, 41, 59];
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 15;

  const addHeading = (text: string, size = 16) => {
    checkPageBreak(size + 10);
    doc.setFontSize(size);
    doc.setTextColor(...primaryColor);
    doc.setFont('helvetica', 'bold');
    doc.text(text, 14, y);
    y += size * 0.6;
    // underline
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(14, y, pageWidth - 14, y);
    y += 8;
  };

  const addText = (text: string, size = 10, bold = false) => {
    checkPageBreak(size + 4);
    doc.setFontSize(size);
    doc.setTextColor(...darkColor);
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    const lines = doc.splitTextToSize(text, pageWidth - 28);
    doc.text(lines, 14, y);
    y += lines.length * (size * 0.5) + 2;
  };

  const checkPageBreak = (needed: number) => {
    if (y + needed > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      y = 15;
    }
  };

  // ===== TITLE =====
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setFontSize(24);
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text(`FitBuddy - ${profile.name}'s Fitness Plan`, pageWidth / 2, 18, { align: 'center' });
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  doc.text(`Prepared for: ${profile.name}  |  Date: ${dateStr}`, pageWidth / 2, 28, { align: 'center' });
  doc.setFontSize(9);
  doc.text(`Analysis generated on ${new Date().toLocaleString('en-IN')}`, pageWidth / 2, 35, { align: 'center' });
  y = 50;

  // ===== PROFILE SUMMARY =====
  addHeading('Profile Summary');

  const goalLabels: Record<string, string> = {
    'fat-loss': 'Fat Loss',
    'muscle-gain': 'Muscle Gain',
    'maintenance': 'Maintenance',
  };

  autoTable(doc, {
    startY: y,
    head: [['Metric', 'Value']],
    body: [
      ['Name', profile.name],
      ['Age', `${profile.age} years`],
      ['Gender', profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)],
      ['Height / Weight', `${profile.height} cm / ${profile.weight} kg`],
      ['BMI', `${bmi.bmi} (${bmi.category})`],
      ['Daily Calories', `${calories} kcal`],
      ['Goal', goalLabels[profile.fitnessGoal]],
      ['Equipment', profile.equipment === 'none' ? 'Bodyweight Only' : profile.equipment.charAt(0).toUpperCase() + profile.equipment.slice(1)],
      ['Diet', profile.dietPreference.charAt(0).toUpperCase() + profile.dietPreference.slice(1)],
      ['Budget', `₹${profile.budget}/day`],
    ],
    theme: 'grid',
    headStyles: { fillColor: primaryColor, fontSize: 10 },
    styles: { fontSize: 9, cellPadding: 3 },
    margin: { left: 14, right: 14 },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // Macros
  addText(`Daily Macros: Protein ${macros.protein}g | Carbs ${macros.carbs}g | Fat ${macros.fat}g`, 11, true);
  y += 5;

  // ===== WORKOUT PLAN =====
  addHeading('Weekly Workout Plan');

  workoutPlan.forEach((day) => {
    checkPageBreak(50);
    autoTable(doc, {
      startY: y,
      head: [[`${day.day} - ${day.focus}`, 'Sets × Reps', 'Rest']],
      body: day.exercises.map((ex) => [
        ex.alternative ? `${ex.name} (Alt: ${ex.alternative})` : ex.name,
        `${ex.sets} × ${ex.reps}`,
        ex.rest,
      ]),
      theme: 'striped',
      headStyles: { fillColor: primaryColor, fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 2.5 },
      margin: { left: 14, right: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 6;
  });

  checkPageBreak(10);
  addText('Sunday: Complete rest day. Focus on sleep and recovery.', 10, true);
  y += 5;

  // ===== DIET PLAN =====
  addHeading('Daily Diet Plan');

  const mealEntries = Object.entries(dietPlan) as [string, { name: string; items: string[]; calories: string; hostelAlternative?: string }][];
  
  mealEntries.forEach(([key, meal]) => {
    checkPageBreak(40);
    const label = key.replace(/([A-Z])/g, ' $1').trim();
    autoTable(doc, {
      startY: y,
      head: [[`${meal.name} (${label})`, `${meal.calories} kcal`]],
      body: [
        ...meal.items.map((item) => [item, '']),
        ...(meal.hostelAlternative ? [[`Hostel Option: ${meal.hostelAlternative}`, '']] : []),
      ],
      theme: 'grid',
      headStyles: { fillColor: primaryColor, fontSize: 10 },
      styles: { fontSize: 9, cellPadding: 2.5 },
      columnStyles: { 1: { cellWidth: 1 } }, // hide second col
      margin: { left: 14, right: 14 },
    });
    y = (doc as any).lastAutoTable.finalY + 5;
  });

  // Budget tips
  checkPageBreak(40);
  addHeading('Budget-Friendly Tips', 13);
  budgetTips.forEach((tip) => {
    addText(`• ${tip}`);
  });
  y += 5;

  // ===== WEEKLY TIPS =====
  addHeading('Weekly Tips for Success', 13);
  const tips = [
    'Stay Hydrated: Drink 3-4 liters of water daily.',
    'Prioritize Sleep: 7-8 hours is crucial for recovery.',
    'Be Consistent: Don\'t skip workouts, even short ones count!',
    'Stay Motivated: Track progress and celebrate small wins.',
  ];
  tips.forEach((tip) => addText(`• ${tip}`));
  y += 5;

  // ===== DISCLAIMER =====
  checkPageBreak(30);
  addHeading('Disclaimer', 12);
  addText(
    'This plan is for general fitness guidance only and does not constitute medical advice. Consult a healthcare professional before starting any new diet or exercise program, especially if you have pre-existing health conditions.',
    9
  );

  // Footer on every page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`FitBuddy | Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 8, { align: 'center' });
  }

  doc.save('FitBuddy-Fitness-Plan.pdf');
};
