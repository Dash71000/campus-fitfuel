import { Dumbbell, Salad, Target, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" />
        
        <div className="container max-w-5xl relative z-10">
          <div className="text-center space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Made for College Students</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Your Personal
              <span className="block text-gradient">Fitness & Diet</span>
              <span className="block">Planner</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Get a personalized workout routine and Indian-friendly diet plan 
              tailored to your goals, budget, and hostel life. No expensive gyms needed!
            </p>

            {/* CTA Button */}
            <div className="pt-4">
              <Button variant="hero" size="xl" onClick={onStart} className="group">
                <span>Start Your Journey</span>
                <Dumbbell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-6">
              {[
                { icon: Target, label: 'Goal-Based Plans' },
                { icon: Salad, label: 'Indian Diet Friendly' },
                { icon: Dumbbell, label: 'No Gym Required' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card shadow-card border border-border/50"
                >
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 gradient-soft">
        <div className="container max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Tell Us About You',
                description: 'Share your goals, diet preferences, budget, and available equipment.',
              },
              {
                step: '02',
                title: 'Get Your Plan',
                description: 'Receive a customized workout and diet plan designed for your lifestyle.',
              },
              {
                step: '03',
                title: 'Stay Consistent',
                description: 'Follow the plan, track your progress, and achieve your fitness goals.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-card shadow-card border border-border/50 hover:shadow-lg transition-shadow"
              >
                <span className="absolute -top-4 left-6 text-4xl font-black text-primary/20">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold mb-2 mt-4">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
