export const cleanString = (inputString) => {
    inputString = String(inputString);
    if(!inputString) return '';
    // Split the input string by commas to handle each element separately
    let elements = inputString.split(',');

    // Initialize an empty array to store the cleaned elements
    let cleanedElements = [];

    // Iterate over each element
    for (let element of elements) {
        // Trim leading/trailing whitespace from each element
        let trimmedElement = element.trim();
        // Replace 'null' with an empty string (which effectively removes it)
        if (trimmedElement.toLowerCase() !== 'null') {
            cleanedElements.push(trimmedElement);
        }
    }

    // Join the cleaned elements back into a single string separated by commas
    let cleanedString = cleanedElements.join(', ');

    if(cleanedString.length === 0) {
        return "Chưa xác định"
    }
    return cleanedString;
}
