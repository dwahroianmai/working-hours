import "../styles.css";

const Circle = ({ percent }) => {
  const style = { "--percentage": `${550 - (550 * percent) / 100}` };
  return (
    <div className=" w-44 h-44 relative pt-6">
      <div className="h-48 w-48 rounded-[50%] p-4 shadow-circle">
        <div className="w-40 h-40 rounded-[50%] shadow-circleInner flex items-center justify-center">
          <div className=" font-medium text-2xl">{percent}%</div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="14rem"
        height="14rem"
        className=" absolute top-5 left-0"
      >
        <circle style={style} cx="97" cy="99.5" r="86" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default Circle;
