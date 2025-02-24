const ProgressTracker = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div className="relative mb-2">
              <div className="w-full h-1 bg-gray-200">
                <div
                  style={{
                    width: `${
                      ((currentStep > index ? index + 1 : currentStep) /
                        steps.length) *
                      100
                    }%`,
                  }}
                  className="h-full bg-blue-500 transition-all duration-500"
                ></div>
              </div>
              <div
                className={`absolute -top-2 left-0 w-5 h-5 rounded-full ${
                  step.completed ? "bg-blue-500" : "bg-gray-200"
                } transition-all duration-500`}
              ></div>
            </div>
            <div className="text-xs text-center">{step.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
