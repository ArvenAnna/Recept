package com.anna.recept.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.io.File;
import java.util.UUID;

/**
 * Utils functions for working with recipe file paths
 * In general path to recipe file should looks like:
 * FOTO_CATALOG_NAME/department_catalog/recipe_name_catalog/recipe_name_+_random_string.extension
 * Temp resource should looks like:
 * TEMP_CATALOG/filename.extension
 */
@NoArgsConstructor(access = AccessLevel.NONE)
public class FilePathUtils {

	/**
	 *
	 * @param path input path for replacement: first/soup/soup.png
	 * @param newCatalogs new catalogs for change: second/cream
	 * @return changed path to file: second/cream/soup.png
	 */
	public static String getChangedCatalogsInPath(String path, String newCatalogs) {
		if (path == null) return null;
		String[] pathFragments = path.split(File.separator);
		String fileName = pathFragments[pathFragments.length - 1];
		return newCatalogs + File.separator + fileName;
	}

	/**
	 * Extract catalog part from path
	 * @param path first/soup/soup.png
	 * @return first/soup
	 */
	public static String extractCatalogFromPath(String path) {
		if (path == null) return null;
		String[] pathFragments = path.split(File.separator);
		String fileName = File.separator + pathFragments[pathFragments.length - 1];
		return path.replace(fileName, "");
	}

	/**
	 * Constructs path for real file from tempfile
	 * @param tempPath
	 * @param catalog
	 * @param subCatalog
	 * @return
	 */
	public static String constructPathWithCatalogsToRealFile(String tempPath, String catalog, String subCatalog) {
		return constructCatalogName(catalog, subCatalog) + File.separator
				+ subCatalog + UUID.randomUUID().toString()
				+ "." + getFileExtensionFromPath(tempPath);
	}

	/**
	 * Constructs path for real small file from normal sized
	 * @param pathToRealFile - path to normal size file
	 * @param suffix - added to filename
	 * @return
	 */
	public static String constructPathToSmallRealFile(String pathToRealFile, String suffix) {
		String extension = '.' + getFileExtensionFromPath(pathToRealFile);
		return pathToRealFile.replace(extension, suffix + extension);
	}

	/**
	 * Constructs part of real path related only to catalogs
	 * @param catalog
	 * @param subCatalog
	 * @return
	 */
	public static String constructCatalogName(String catalog, String subCatalog) {
		return catalog + File.separator + subCatalog;
	}

	public static String getFileExtensionFromPath(String path) {
		String[] pathFragments = path.split("\\.");
		return pathFragments[pathFragments.length - 1];
	}
}
