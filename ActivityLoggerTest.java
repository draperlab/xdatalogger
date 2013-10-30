import java.util.*;
import org.draper.ActivityLogger;

public class ActivityLoggerTest {


	public static void main(String [ ] args){
		ActivityLogger ac = new ActivityLogger();
		ac.registerActivityLogger("http://127.0.0.1:1337");

		ac.componentName = "pyTestComp";
		ac.componentVersion = "34.87";
		//ac.echoLogsToConsole = true;
		Hashtable<String, Object> meta1 = new Hashtable<String, Object>();
		meta1.put("testQuant", 3);
		meta1.put("testQual", "quall");
		
		for(int i = 0; i<10; i++){
		ac.logSystemActivity("TEST SYSTEM MESSAGE");
		System.out.println();
		ac.logSystemActivity("TEST SYSTEM MESSAGE", meta1);
		System.out.println();
		ac.logUserActivity("TEST USER MESSAGE" , "scaleHistogram", ActivityLogger.WF.COLLABORATE);
		System.out.println();
		ac.logUserActivity("TEST USER MESSAGE" , "scaleHistogram", ActivityLogger.WF.MARSHAL, meta1);
		System.out.println();
		ac.logUILayout("TEST UI LAYOUT", "Viz Element", true, 200, 450, 200, 500);
		System.out.println();
		ac.logUILayout("TEST UI LAYOUT", "Viz Element", true, 200, 450, 200, 500, meta1);
		}
	}

}
