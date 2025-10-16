import { RiCloudyLine, RiMistLine, RiRainyLine, RiSunLine, RiTempColdLine } from "@remixicon/react";

export const getWeatherStyles = (condition: string) => {
    const lowerCaseCondition = condition.toLowerCase();

    switch (true) {
        case lowerCaseCondition.includes("clear"):
            return {
                gradient: "from-yellow-400 to-orange-500",
                icon: <RiSunLine size={48} />,
            };
            case lowerCaseCondition.includes("clouds"):
                return {
                  gradient: "from-blue-400 to-indigo-600",
                  icon: <RiCloudyLine size={48} />,
                };
            case lowerCaseCondition.includes("rain"):
                return {
                  gradient: "from-gray-500 to-blue-800",
                  icon: <RiRainyLine size={48} />,
                };
            case lowerCaseCondition.includes("mist"):
            case lowerCaseCondition.includes("fog"):
                return {
                  gradient: "from-slate-500 to-slate-700",
                  icon: <RiMistLine size={48} />,
                };
            default:
                return {
                    gradient: "from-indigo-800 to-purple-900",
                    icon: <RiTempColdLine size={48} />,
                };
    }
};