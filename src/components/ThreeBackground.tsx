import studentBg from '@/assets/student-bg.jpg';

const ThreeBackground = () => {
  return (
    <div 
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10"
      />
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url(${studentBg})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '500px auto',
          backgroundPosition: 'center'
        }}
      />
    </div>
  );
};

export default ThreeBackground;
