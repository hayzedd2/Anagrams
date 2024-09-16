export const verifyWord = async (word: string) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      const data = await response.json();
      if (data.length === 0 || data[0].title === "No Definitions Found") {
        return false;
      }
      return true;
    } catch (err) {
      return false; 
    }
  };