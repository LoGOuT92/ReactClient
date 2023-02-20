export const textValueValidate = (text: string): string => {
    if (!text) {
      return "Pole jest wymagane.";
    } else if (text.length < 1) {
      return "Nazwa musi zawierac więcej niż 1 znak";
    } else if (text.length > 40) {
      return `Maksymalna liczba znaków: 40`;
    } else {
      return "";
    }
  };
  
  export const numberValidate = (value: number): string => {
    if (!value || value < 0) {
      return "Wartośc nie może byc 0!";
    } else if (value > 1000000) {
      return "Wartość musi być mniejsza od 1000000";
    } else {
      return "";
    }
  };