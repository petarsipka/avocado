package tests;

import com.app.Compensation;
import com.app.Right;
import com.app.RightType;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;

public class Helper {

    public static KieContainer container() {
        return KieServices.Factory.get().getKieClasspathContainer();
    }

    public static KieSession forwardSession() {
        return container().newKieSession("ksession-rules");
    }

    public static void fireForward(KieSession session) {
        session.getAgenda().getAgendaGroup("level4").setFocus();
        session.getAgenda().getAgendaGroup("level3").setFocus();
        session.getAgenda().getAgendaGroup("level2").setFocus();
        session.getAgenda().getAgendaGroup("level1").setFocus();
        session.fireAllRules();
    }

    public static boolean hasRight(KieSession session, RightType type) {
        for (Object o : session.getObjects()) {
            if (o instanceof Right && ((Right) o).getType() == type) {
                return true;
            }
        }
        return false;
    }

    public static Compensation compensation(KieSession session, String article) {
        for (Object o : session.getObjects()) {
            if (o instanceof Compensation && article.equals(((Compensation) o).getArticle())) {
                return (Compensation) o;
            }
        }
        return null;
    }
}
