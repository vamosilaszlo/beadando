import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class LottoModel {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/VikingLotto";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "";

    private String dbName = "VikingLotto";
    private String tableName = "LottoSzamok";
    

    public boolean createDatabaseIfNotExists() throws SQLException {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/", DB_USER, DB_PASSWORD);
        PreparedStatement stmt = conn.prepareStatement("CREATE DATABASE IF NOT EXISTS " + dbName)) {
            stmt.executeUpdate();
            System.out.println("Kapcsolódás sikeres!");
            return true;
        } catch (SQLException e) {
            return false;
        }
    }

    public boolean createTableIfNotExists() throws SQLException {
        String query = "CREATE TABLE IF NOT EXISTS " +tableName+" (" +
                "id INT AUTO_INCREMENT PRIMARY KEY, " +
                "szam1 INT NOT NULL, " +
                "szam2 INT NOT NULL, " +
                "szam3 INT NOT NULL, " +
                "szam4 INT NOT NULL, " +
                "szam5 INT NOT NULL, " +
                "szam6 INT NOT NULL)";
        try (Connection conn = connect();
                PreparedStatement stmt = conn.prepareStatement(query)) {
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            return false;
        }
    }

    public boolean testDatabaseConnection() {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            return true;
        } catch (SQLException e) {
            return false;
        }
    }


    public boolean isDatabaseConnected() {
        try (Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/", DB_USER,
                DB_PASSWORD);//Connection conn = connect();
        PreparedStatement stmt = conn.prepareStatement("CREATE DATABASE IF NOT EXISTS " + dbName)){
             stmt.executeUpdate();
             System.out.println("Kapcsolódás sikeres!");
            return true; 
        } catch (SQLException e) {
            // System.out.println(e.getMessage());
            return false; 
        }
    }

    public Connection connect() throws SQLException {
        return DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);

    }

    public void saveLottoNumbers(int[] numbers) throws SQLException {
        String query = "INSERT INTO LottoSzamok (szam1, szam2, szam3, szam4, szam5, szam6) VALUES (?, ?, ?, ?, ?, ?)";
        try (Connection conn = connect(); PreparedStatement stmt = conn.prepareStatement(query)) {
            for (int i = 0; i < numbers.length; i++) {
                stmt.setInt(i + 1, numbers[i]);
            }
            stmt.executeUpdate();
        }
    }
}
