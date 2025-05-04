import * as fs from "fs";
import * as path from "path";

// Ruta del archivo original y del archivo reconstruido
const inputCsvPath = path.resolve(__dirname, "hola.csv");
const outputCsvPath = path.resolve(__dirname, "reconvertido.csv");

function convertToBase64(file: File) {
  const reader = new FileReader();
  let base64String = "";
  reader.readAsDataURL(file);
  reader.onload = () => {
    base64String = reader.result as string;
    console.log(base64String);
  };

  return base64String;
}

// Función para leer un archivo CSV y convertirlo a Base64
function convertCsvToBase64(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const base64String = fileBuffer.toString("base64");
  console.log("Archivo convertido a Base64:");
  console.log(base64String);
  return base64String;
}

// Función para convertir Base64 a CSV y guardarlo como archivo
function convertBase64ToCsv(base64String: string, outputPath: string): void {
  const buffer = Buffer.from(base64String, "base64");
  fs.writeFileSync(outputPath, buffer);
  console.log(`Archivo reconvertido y guardado en: ${outputPath}`);
}

// Ejecución del programa
try {
  const base64 = convertCsvToBase64(inputCsvPath);
  convertBase64ToCsv(base64, outputCsvPath);
} catch (error) {
  console.error("Error:", error);
}
