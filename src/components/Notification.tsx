import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faCircleInfo,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type NotificationProps = {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
};

const icons = {
  success: faCircleCheck,
  error: faCircleXmark,
  info: faCircleInfo,
};

const bgColors = {
  success: "bg-green-100 dark:bg-green-800",
  error: "bg-red-100 dark:bg-red-800",
  info: "bg-blue-100 dark:bg-blue-800",
};

const textColors = {
  success: "text-green-800 dark:text-green-200",
  error: "text-red-800 dark:text-red-200",
  info: "text-blue-800 dark:text-blue-200",
};

const iconColors = {
  success: "text-green-500 dark:text-green-400",
  error: "text-red-500 dark:text-red-400",
  info: "text-blue-500 dark:text-blue-400",
};

const Notification = ({
  message,
  type = "info",
  onClose,
}: NotificationProps) => {
  return (
    <div
      className={`
        fixed top-6 left-1/2 -translate-x-1/2 z-50
        w-fit max-w-sm sm:max-w-md
        rounded-xl px-6 py-4 shadow-lg
        flex items-start gap-3 animate-fadeIn
        ${bgColors[type]} ${textColors[type]}
      `}
    >
      <FontAwesomeIcon
        icon={icons[type]}
        className={`w-5 h-5 mt-1 ${iconColors[type]}`}
      />
      <span className="flex-1 text-sm sm:text-base">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
          aria-label="Fermer la notification"
        >
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
        </button>
      )}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Notification;
