export interface ImageAnalysisResult {
    tags: {
        values: {
            confidence: number;
            name: string;
        }[];
    };
}