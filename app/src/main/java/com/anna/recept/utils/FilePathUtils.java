package com.anna.recept.utils;

import java.io.File;
import java.util.UUID;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

/**
 * Utils functions for working with recipe file paths
 * In general path to recipe file should looks like:
 * FOTO_CATALOG_NAME/department_catalog/recipe_name_catalog/recipe_name_+_random_string.extension
 * Temp resource should looks like:
 * TEMP_CATALOG/filename.extension
 */
@NoArgsConstructor(access = AccessLevel.NONE)
public class FilePathUtils {

	private static final String FOTO_LOCATION_ENV = "FOTO_LOCATION";
	private static final String TEMP_LOCATION_ENV = "TEMP_LOCATION";
	public static final String DEFAULT_EXTENSION = "png";

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
	 * Temp resource should looks like: TEMP_CATALOG/filename.extension
	 * @param path given path for analysis
	 * @return true if it is temp path, false if it real one
	 */
	public static boolean isTempPath(String path) {
		return path != null && path.startsWith(System.getenv(TEMP_LOCATION_ENV)) && path.split(File.separator).length == 2;
	}

	/**
	 * Constructs path for real file from tempfile
	 * @param tempPath
	 * @param catalog
	 * @param subCatalog
	 * @param suffix - added to filename
	 * @return
	 */
	public static String constructPathWithCatalogsToRealFile(String tempPath, String catalog, String subCatalog, String suffix) {
		String[] pathFragments = tempPath.split("\\.");
		String extension = pathFragments.length <= 1
				? DEFAULT_EXTENSION
				: pathFragments[pathFragments.length - 1];
		return constructCatalogName(catalog, subCatalog) + File.separator
				+ subCatalog + UUID.randomUUID().toString() + (suffix != null ? suffix : "") + "." + extension;
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
}
