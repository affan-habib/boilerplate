const EnglishIcon = ({ className = "w-5 h-5" }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="12" fill="#F0F0F0" />
      <path d="M23.9999 12C23.9999 18.6274 18.6273 24 11.9999 24C5.37256 24 0 18.6274 0 12H23.9999Z" fill="#0052B4" />
      <path d="M0 12C0 5.37258 5.37256 0 11.9999 0C18.6273 0 23.9999 5.37258 23.9999 12" fill="#D80027" />
      <path d="M12 6L12.9511 8.90983H16.0329L13.5409 10.6803L14.4921 13.5902L12 11.8197L9.50791 13.5902L10.4591 10.6803L7.96708 8.90983H11.0489L12 6Z" fill="#F0F0F0" />
    </svg>
  );
};

export default EnglishIcon;
