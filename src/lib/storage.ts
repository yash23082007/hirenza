import { ProgressDataSchema, ValidatedProgressData } from "./schema";

const STORAGE_KEY = "hirenza-v2-progress";

export class StorageService {
  static saveProgress(data: ValidatedProgressData): void {
    if (typeof window === "undefined") return;
    try {
      // Validate before saving to ensure state corruption doesn't get persisted
      const validated = ProgressDataSchema.parse(data);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
    } catch (e) {
      console.error("StorageService: Failed to save progress data", e);
    }
  }

  static loadProgress(): ValidatedProgressData | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      
      // Attempt to parse with Zod schema
      const result = ProgressDataSchema.safeParse(parsed);
      if (result.success) {
        return result.data;
      } else {
        console.warn("StorageService: Loaded data failed validation", result.error);
        // We could try to migrate here, but let's just return what we can
        return null;
      }
    } catch (e) {
      console.error("StorageService: Failed to load progress data", e);
      return null;
    }
  }

  static clearProgress(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  }
}
