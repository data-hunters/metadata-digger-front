export interface Photo {
    id: string;
    base_path: string;
    file_path: string;
    file_type: string;
    directories: Array<String>;
    meta_data: Record<string, string | number>;
    thumbnail: string;
}