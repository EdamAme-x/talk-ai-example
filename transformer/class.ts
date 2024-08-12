import { pipeline, env } from "@sroussey/transformers";

export class JapaneseAIPipeline {
  static task = 'question-answering' as const;
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance: ReturnType<typeof pipeline> | null = null;

  static async getInstance(progress_callback?: Function) {
    if (this.instance === null) {
      env.cacheDir = './.cache';

      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}