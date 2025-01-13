 import java.io.*;
import java.sql.SQLException;
import java.util.*;

public class LottoController {
    private LottoModel model;
    private LottoView view;

    public LottoController(LottoModel model, LottoView view) {
        this.model = model;
        this.view = view;
    }

    public void importLottoNumbers(String filePath) {

        if (!model.isDatabaseConnected()) {
            view.showDatabaseError();
            return;
        }
        try {
            model.createDatabaseIfNotExists();
            view.showCreateDBMessage();
            model.createTableIfNotExists();
            view.showCreateTableMessage();
        } catch (SQLException e) {
            view.showDatabaseError();
            return;
        }

        File file = new File(filePath);
        if (!file.exists()) {
            view.showFileNotFound(filePath);
            return;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            int importedRecords = 0;
            int readRecords = 0;
            List<String> invalidRows = new ArrayList<>();

            view.showHead("Import csv file: " + filePath
                         + "\nHibas sorok:"
                         + "\n------------------------------------------------------");
            while ((line = reader.readLine()) != null) {
                readRecords++;
                String[] numbers = line.split(";");

                if (numbers.length != 6) {
                    view.showError("Hibas sorhossz: ", readRecords, numbers);
                    invalidRows.add(Arrays.toString(numbers));
                    continue;
                }

                try {
                    int[] nums = new int[6];
                    boolean valid = true;

                    for (int i = 0; i < 6; i++) {
                        nums[i] = Integer.parseInt(numbers[i].trim());
                        if (nums[i] < 1 || nums[i] > 48) {
                            view.showError("Tartomanyon kivuli szam", readRecords, numbers);
                            invalidRows.add(Arrays.toString(numbers));
                            valid = false;
                            break;
                        }
                    }

                    if (valid) {
                        model.saveLottoNumbers(nums);
                        importedRecords++;
                    }
                } catch (NumberFormatException e) {
                    view.showError("Nem szam", readRecords, numbers);
                    invalidRows.add(Arrays.toString(numbers));
                }
            }

            view.showSummary(readRecords, importedRecords);

            if (!invalidRows.isEmpty()) {
                try (BufferedWriter errorWriter = new BufferedWriter(new FileWriter("hibak.log", false))) {
                    for (String error : invalidRows) {
                        errorWriter.write(error);
                        errorWriter.newLine();
                    }
                }
                view.showLogSavedMessage();
            }

        } catch (SQLException | IOException e) {
            view.showDatabaseError();
        }
    }
}
