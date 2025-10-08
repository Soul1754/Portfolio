/**
 * Split text into individual characters or words wrapped in spans
 * Lightweight alternative to GSAP's SplitText plugin
 */

export type SplitType = "chars" | "words" | "lines";

export interface SplitTextOptions {
  type?: SplitType;
  charsClass?: string;
  wordsClass?: string;
  linesClass?: string;
}

export function splitText(
  element: HTMLElement,
  options: SplitTextOptions = {}
): { chars?: HTMLElement[]; words?: HTMLElement[]; lines?: HTMLElement[] } {
  const {
    type = "chars",
    charsClass = "char",
    wordsClass = "word",
    linesClass = "line",
  } = options;

  const originalText = element.textContent || "";
  element.innerHTML = "";

  const chars: HTMLElement[] = [];
  const words: HTMLElement[] = [];
  const lines: HTMLElement[] = [];

  if (type === "chars" || type === "words") {
    const wordArray = originalText.split(" ");

    wordArray.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = wordsClass;
      wordSpan.style.display = "inline-block";

      if (type === "chars") {
        word.split("").forEach((char) => {
          const charSpan = document.createElement("span");
          charSpan.className = charsClass;
          charSpan.style.display = "inline-block";
          charSpan.textContent = char;
          chars.push(charSpan);
          wordSpan.appendChild(charSpan);
        });
      } else {
        wordSpan.textContent = word;
      }

      words.push(wordSpan);
      element.appendChild(wordSpan);

      // Add space between words
      if (wordIndex < wordArray.length - 1) {
        element.appendChild(document.createTextNode(" "));
      }
    });
  } else if (type === "lines") {
    // Simple line splitting - for more complex layouts, consider using a library
    const textLines = originalText.split("\n");
    textLines.forEach((line) => {
      const lineSpan = document.createElement("span");
      lineSpan.className = linesClass;
      lineSpan.style.display = "block";
      lineSpan.textContent = line;
      lines.push(lineSpan);
      element.appendChild(lineSpan);
    });
  }

  return {
    chars: chars.length > 0 ? chars : undefined,
    words,
    lines: lines.length > 0 ? lines : undefined,
  };
}

export function revertSplit(element: HTMLElement, originalText: string): void {
  element.innerHTML = originalText;
}
