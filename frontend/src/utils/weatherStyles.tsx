import { RiCloudyLine, RiMistLine, RiRainyLine, RiSunLine, RiTempColdLine } from "@remixicon/react";

export const getWeatherStyles = (condition: string) => {
    const lowerCaseCondition = condition.toLowerCase();

    switch (true) {
        case lowerCaseCondition.includes("clear"):
            return {
                bgColor: "bg-sky-500",
                icon: <RiSunLine size={35} className="text-gray-300" />,
            };
            case lowerCaseCondition.includes("clouds"):
                return {
                  bgColor: "bg-indigo-600",
                  icon: <RiCloudyLine size={35} className="text-gray-300" />,
                };
            case lowerCaseCondition.includes("rain"):
                return {
                  bgColor: "bg-green-700",
                  icon: <RiRainyLine size={35} className="text-gray-300" />,
                };
            case lowerCaseCondition.includes("mist"):
            case lowerCaseCondition.includes("fog"):
                return {
                  bgColor: "bg-red-600",
                  icon: <RiMistLine size={35} className="text-gray-300" />,
                };
            default:
                return {
                    bgColor: "bg-orange-700",
                    icon: <RiTempColdLine size={35} className="text-gray-300" />,
                };
    }
};