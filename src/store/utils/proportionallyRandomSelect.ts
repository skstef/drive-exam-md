export function proportionallyRandomSelect<T>(array: T[], n: number): T[] {
  if (n > array.length) {
    throw new Error("N cannot be greater than the length of the array.");
  }

  // Create a copy of the array to avoid mutating the original array
  const copyArray = [...array];

  // Array to store the selected elements
  const selectedElements = [];

  for (let i = 0; i < n; i++) {
    // Generate a random index between 0 and the length of the remaining array
    const randomIndex = Math.floor(Math.random() * copyArray.length);

    // Add the randomly selected element to the result array
    selectedElements.push(copyArray[randomIndex]);

    // Remove the selected element from the copyArray to avoid selecting it again
    copyArray.splice(randomIndex, 1);
  }

  return selectedElements;
}
