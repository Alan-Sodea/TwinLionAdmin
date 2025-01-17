export const uploadImage = async (file) => {
  // In a real application, you would upload the file to a storage service
  // For this example, we'll create a data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};