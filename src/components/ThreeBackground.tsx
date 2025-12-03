import studentBg from '@/assets/student-bg.jpg';

const ThreeBackground = () => {
  return (
    <div 
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"
      />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${studentBg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '600px auto',
          backgroundPosition: 'center'
        }}
      />
    </div>
  );
};

export default ThreeBackground;
