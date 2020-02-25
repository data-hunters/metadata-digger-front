export interface Photo {
    id: string;
    base_path: string;
    file_path: string;
    file_type: string;
    directories: string[];
    meta_data: Record<string, string | number>;
    thumbnail: string;
    labels: string[];
}