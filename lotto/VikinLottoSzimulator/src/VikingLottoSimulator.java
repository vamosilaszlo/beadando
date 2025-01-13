import javax.swing.*;
import javax.swing.border.EmptyBorder;
import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.sql.*;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class VikingLottoSimulator {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/";
    private static final String DB_NAME = "vikinglotto";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "";

    private JFrame frame;
    private JCheckBox[] checkBoxes;
    private JButton drawButton;
    private JButton closeButton;
    private JLabel resultLabel;

    public VikingLottoSimulator() {
        frame = new JFrame("Viking Lottó Szimulátor");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout(10, 10)); // Margin az ablak széleihez

        JPanel gridPanel = new JPanel(new GridLayout(6, 8)); // 6 sor, 8 oszlop a 48 számhoz
        gridPanel.setBorder(new EmptyBorder(10, 10, 10, 10)); // Padding a táblázat körül

        checkBoxes = new JCheckBox[48];
        for (int i = 0; i < 48; i++) {
            checkBoxes[i] = new JCheckBox(String.valueOf(i + 1));
            checkBoxes[i].addActionListener(e -> updateCheckBoxState());
            gridPanel.add(checkBoxes[i]);
        }

        drawButton = new JButton("Sorsol");
        drawButton.setEnabled(false);
        drawButton.addActionListener(e -> handleDraw());

        closeButton = new JButton("Bezár");
        closeButton.addActionListener(e -> System.exit(0));

        resultLabel = new JLabel("Válasszon 6 számot!", SwingConstants.CENTER);

        JPanel rightPanel = new JPanel();
        rightPanel.setLayout(new BoxLayout(rightPanel, BoxLayout.Y_AXIS));
        rightPanel.setBorder(new EmptyBorder(10, 10, 10, 10)); // Padding a jobb oldali panel körül



        drawButton.setAlignmentX(Component.CENTER_ALIGNMENT);
        closeButton.setAlignmentX(Component.CENTER_ALIGNMENT);
        resultLabel.setAlignmentX(Component.CENTER_ALIGNMENT);


        rightPanel.add(drawButton);
        rightPanel.add(Box.createRigidArea(new Dimension(0, 10)));
        rightPanel.add(closeButton);
        rightPanel.add(Box.createRigidArea(new Dimension(0, 20)));
        rightPanel.add(resultLabel);
        rightPanel.add(Box.createRigidArea(new Dimension(0, 40)));

        JLabel footerLabel = new JLabel("Vámosi László, 2025.01.11.", SwingConstants.LEFT);
        footerLabel.setFont(new Font("Arial", Font.PLAIN, 10));
        footerLabel.setBorder(new EmptyBorder(5, 10, 5, 10)); // Padding az alsó sáv körül

        frame.add(gridPanel, BorderLayout.CENTER);
        frame.add(rightPanel, BorderLayout.EAST);
        frame.add(footerLabel, BorderLayout.SOUTH);

        frame.setSize(650, 450);
        frame.setVisible(true);

        setupDatabase();
    }

    private void updateCheckBoxState() {
        int selectedCount = (int) Arrays.stream(checkBoxes)
                .filter(JCheckBox::isSelected)
                .count();

        for (JCheckBox checkBox : checkBoxes) {
            checkBox.setEnabled(selectedCount < 6 || checkBox.isSelected());
        }

        drawButton.setEnabled(selectedCount == 6);
    }

    private void handleDraw() {
        Set<Integer> userNumbers = IntStream.range(0, checkBoxes.length)
                .filter(i -> checkBoxes[i].isSelected())
                .mapToObj(i -> i + 1)
                .collect(Collectors.toSet());

        Set<Integer> drawnNumbersSet = new HashSet<>();
        Random random = new Random();
        while (drawnNumbersSet.size() < 6) {
            drawnNumbersSet.add(random.nextInt(48) + 1);
        }

        ArrayList<Integer> drawnNumbers = new ArrayList<>(drawnNumbersSet);
        Collections.sort(drawnNumbers);

        saveToDatabase(drawnNumbers);

        ArrayList<Integer> matchedNumbers = new ArrayList<>(userNumbers);
        matchedNumbers.retainAll(drawnNumbers);

        resultLabel.setText("<html>Kisorsolt számok:<br>" + formatNumbers(drawnNumbers) +
                "<br>Eltalált számok:<br>" + formatNumbers(matchedNumbers) + "</html>");
        drawButton.setEnabled(false);
        // sorsolás után letilthatjuk az összes számot az alábbi sorral, ha szükséges
        // Arrays.stream(checkBoxes).forEach(checkBox -> checkBox.setEnabled(false));
    }

    private String formatNumbers(ArrayList<Integer> numbers) {
        return numbers.stream()
                .map(String::valueOf)
                .collect(Collectors.joining("; "));
    }

    private void setupDatabase() {
        try (Connection connection = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            Statement statement = connection.createStatement();
            statement.executeUpdate("CREATE DATABASE IF NOT EXISTS " + DB_NAME);
            statement.close();
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(frame, "A MySQL szerver nem elérhető.", "Hiba", JOptionPane.ERROR_MESSAGE);
            // e.printStackTrace();
            System.exit(1); // Kilépés a programból
        }

        try (Connection connection = DriverManager.getConnection(DB_URL + DB_NAME, DB_USER, DB_PASSWORD)) {
            Statement statement = connection.createStatement();
            statement.executeUpdate(
                    "CREATE TABLE IF NOT EXISTS lottoszamok (" +
                            "id INT AUTO_INCREMENT PRIMARY KEY, " +
                            "szam1 INT NOT NULL, " +
                            "szam2 INT NOT NULL, " +
                            "szam3 INT NOT NULL, " +
                            "szam4 INT NOT NULL, " +
                            "szam5 INT NOT NULL, " +
                            "szam6 INT NOT NULL" +
                            ")");
            statement.close();
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(frame, "A MySQL szerver nem elérhető.", "Hiba", JOptionPane.ERROR_MESSAGE);
            e.printStackTrace();
            System.exit(1); // Kilépés a programból
        }
    }

    private void saveToDatabase(ArrayList<Integer> numbers) {
        String query = "INSERT INTO lottoszamok (szam1, szam2, szam3, szam4, szam5, szam6) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection connection = DriverManager.getConnection(DB_URL + DB_NAME, DB_USER, DB_PASSWORD);
                PreparedStatement preparedStatement = connection.prepareStatement(query)) {

            for (int i = 0; i < numbers.size(); i++) {
                preparedStatement.setInt(i + 1, numbers.get(i));
            }
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            JOptionPane.showMessageDialog(frame, "A MySQL szerver nem elérhető.", "Hiba", JOptionPane.ERROR_MESSAGE);
            e.printStackTrace();
        }
    }


    public static void main(String[] args) {
        new VikingLottoSimulator();
    }
}
