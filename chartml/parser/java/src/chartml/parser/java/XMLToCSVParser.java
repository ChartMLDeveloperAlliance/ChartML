package chartml.parser.java;

import java.io.File;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import chartml.schema.ChartType;
import chartml.schema.DataGroupType;
import chartml.schema.DataPointType;
import chartml.schema.PointPartType;

//much of the JAXB code adapted from http://www.mkyong.com/java/jaxb-hello-world-example/
public class XMLToCSVParser {
	public static void convertXMLToCSV(File file) {
		JAXBContext context = null;
		ChartType chart = null;
		try {
			context = JAXBContext.newInstance(ChartType.class);
			if(context != null) {
				Unmarshaller unmarshaller = context.createUnmarshaller();				
				JAXBElement<ChartType> element = (JAXBElement<ChartType>) unmarshaller.unmarshal(file);
				chart = (ChartType) element.getValue();
//				System.out.println(element.getValue());
			}
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		System.out.println(chart);
		DataGroupType group = chart.getData().getGroups().getGroup();
		for(DataPointType point : group.getPoint()) {
			String line = "";
			for(PointPartType part : point.getPointPart()) {
				String value = part.getValue();
				line += value;
				line += ", ";
			}
			if(line.length() > 2) line = line.substring(0, line.length()-2);
			System.out.println(line);
		}
	}
}
