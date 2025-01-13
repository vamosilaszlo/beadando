import java.util.Arrays;

public class LottoView {
    public void showHead(String text){
        System.out.println(text);
    }
    public void showError(String message, int recordNumber, String[] numbers) {
        System.out.printf("%-23s %4d. %-10s%n", message, recordNumber, Arrays.toString(numbers));
    }

    public void showSummary(int totalRecords, int successfulImports) {
        System.out.println("\nBeolvasott rekordok szama: " + totalRecords);
        System.out.println("Sikeresen importalt rekordok szama: " + successfulImports);
    }

    public void showLogSavedMessage() {
        System.out.println("\nHibas sorok elmentve a hibak.log fajlba.");
    }

    public void showDatabaseError() {
        System.out.println("\nA MySQL adatbázis szerver nem elérhető.");

    }

    public void showFileNotFound(String filePath) {
        System.out.println("\nA megadott fájl nem található: " + filePath);
    }

    public void showCreateDBMessage() {
        System.out.println("Adatbázis létezik: " + "vikinglotto");
    }
    public void showCreateTableMessage() {
        System.out.println("Tábla létezik: " + "lottoszamok");
    }



}
