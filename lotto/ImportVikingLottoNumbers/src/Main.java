/*
 * Vámosi László
 * SZOFT II/1/E
 * 2025.1.10.
 * A program csv fájlból inportál adatokat MySQL adatbázisba.
 * Létrehozza az adatbázist, táblát, ha az nem létezik.
 *  
 */

public class Main {
    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("=================================================");
            System.out.println(
                    "Nem adtal meg fajl nevet.\nHasznalat: \njava -jar VikingLottoImport.jar <path/fajlnev.csv>");
            return;
        }
        String filePath = args[0];
        
        // String filePath = "VikingLottoSzamok.csv";
        LottoModel model = new LottoModel();
        LottoView view = new LottoView();
        LottoController controller = new LottoController(model, view);
        
        view.showHead("\nFajl eleresi utja: " + filePath);
        
        controller.importLottoNumbers(filePath);

    }
}
