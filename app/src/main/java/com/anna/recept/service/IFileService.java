package com.anna.recept.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * Structure of folders:
 *   - tempfiles
 *          - tempfile.jpg
 *   - photo
 *     - department
 *       - recipeName
 *             - recipe123.jpg
 *             - recipe123-small.jpg
 */
public interface IFileService {

    String saveTemporaryFile(MultipartFile file) throws IOException;

    /**
     * Deletes folder with recipe name and all its content
     */
    void deleteRecipeFolder(String department, String recipeName);

    void cleanTempFiles() throws IOException;

    String saveRecipeFile(String path, String department, String name);
}
