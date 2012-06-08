package chartml.parser.java;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import au.com.bytecode.opencsv.CSVReader;
import chartml.schema.ChartType;
import chartml.schema.DataGroupType;
import chartml.schema.DataPointType;
import chartml.schema.ObjectFactory;
import chartml.schema.PointPartType;
import chartml.schema.RenderingType;
import chartml.schema.VariableDataType;
import chartml.schema.VariableGroupType;
import chartml.schema.VariableType;

//much of the JAXB code adapted from http://www.mkyong.com/java/jaxb-hello-world-example/
public class CSVToXMLParser {

	private static ObjectFactory factory = new ObjectFactory();

	public static void convertCSVToXML(File inputFile) {
		ChartType chart = CSVToXMLParser.addCoreChart();
			
		int variable_count = CSVToXMLParser.addData(chart, inputFile);
		CSVToXMLParser.addVariables(chart, variable_count);
		CSVToXMLParser.addRendering(chart);
		
		CSVToXMLParser.writeXML(inputFile, chart);
	}
	
	private static ChartType addCoreChart() {
		ChartType chart = factory.createChartType();
		chart.setData(factory.createDataType());
		chart.getData().setGroups(factory.createDataGroupsType());
		DataGroupType group = factory.createDataGroupType();
		chart.getData().getGroups().setGroup(group);
		return chart;
	}
	
	private static int addData(ChartType chart, File inputFile) {
		// CSV Reading based on examples from opencsv download.
		CSVReader reader = null;
		int variable_count=0;
		try {
			reader = new CSVReader(new FileReader(inputFile));
			String[] nextLine;
			while((nextLine = reader.readNext()) != null) {
				if(nextLine.length > 0) {
					CSVToXMLParser.addPoint(nextLine, chart.getData().getGroups().getGroup());
					variable_count = Math.max(variable_count, nextLine.length); // maximum number of columns.
				}
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return variable_count;
	}
	
	private static void addPoint(String[] nextLine, DataGroupType group) {
		DataPointType point = factory.createDataPointType();
		int index = 0;
		for(String cell : nextLine) {
			++index;
			String variableID = new Integer(index).toString();
			PointPartType part = factory.createPointPartType();
			part.setVariableID(variableID);
			part.setValue(cell);
			point.getPointPart().add(part);
		}
		group.getPoint().add(point);		
	}
	
	private static void addVariables(ChartType chart, int variable_count) {
		VariableGroupType variables = factory.createVariableGroupType();
		for(int i=1; i<=variable_count; i++) {
			VariableType variable = factory.createVariableType();
			variable.setVariableID(new Integer(i).toString());
			variable.setType(VariableDataType.ORDINAL);
			variables.getVariable().add(variable);
		}
		chart.getData().setVariables(variables);
	}
	
	private static void addRendering(ChartType chart) {
		// All the rendering stuff will default. 
		// Should the schema be edited so this is optional?
		// This would make it easier to convert from CSV in new schema iterations.
		RenderingType rendering = factory.createRenderingType();
		rendering.setGlobalRendering(factory.createGlobalRenderingType());
		rendering.getGlobalRendering().setChartSpecies("Coordinate Graph");
		rendering.setDataRendering(factory.createDataRenderingType());
		rendering.setVariableRendering(factory.createVariableRenderingType());
		chart.setRendering(rendering);
	}

	private static void writeXML(File inputFile, ChartType chart) {
		// need to use JAXBElement for the marshaller. Something about @XmlRootElement and ChartType
		// TODO: ChartType currently needs @XmlRootElement added for this coversion to work. Fix it so nothing has to be hand-spun.
		JAXBElement<ChartType> jaxbChart = factory.createChart(chart);

		try {
			File outputFile = new File(inputFile.getAbsoluteFile()+".chartml");
			JAXBContext jaxbContext = JAXBContext.newInstance(ChartType.class);
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
		 
			// output pretty printed
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
		 
			jaxbMarshaller.marshal(jaxbChart, outputFile);
//			jaxbMarshaller.marshal(chart, System.out);
		 
		} catch (JAXBException e) {
			e.printStackTrace();
		}		
	}
}
