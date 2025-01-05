interface FormDataObject {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // To allow for any key-value pair, including arrays and objects
  }
  
  export const prepareFormData = (data: FormDataObject): FormData => {
    const formData = new FormData();
  
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value) && value[0] instanceof File) {
        // If the value is an array of files
        value.forEach((file) => formData.append(key, file));
      } else if (value instanceof File) {
        // If the value is a single file
        formData.append(key, value);
      } else {
        // For other types of fields (text, numbers, etc.)
        formData.append(key, value.toString());
      }
    });
  
    return formData;
  };
  