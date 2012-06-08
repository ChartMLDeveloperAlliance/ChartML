package chartml.parser.java;

import java.io.File;
import java.io.FilenameFilter;

public class Driver {
	public Driver() {
		
	}
	
	public static void main(String [] args) {
		// XML conversion check. Not really needed to run right now.
//		File xmlFile = new File("../../model/sample1.chartml");
//		XMLToCSVParser.convertXMLToCSV(xmlFile);
		
		File dir = new File("etc/samples");
		String[] csvFilenames = dir.list(new FilenameFilter() {
			public boolean accept(File dir, String name) {
				return name.endsWith(".csv") || name.endsWith(".CSV");
			}
		});
		
		for(String csvFilename : csvFilenames) {
			File csvFile = new File(dir.getAbsolutePath()+"/"+csvFilename);
			System.out.println("Converting CSV: "+csvFilename);
			CSVToXMLParser.convertCSVToXML(csvFile);
		}
	}
}
