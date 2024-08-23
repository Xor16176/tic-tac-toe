import java.util.ArrayList;
import java.util.List;

public class TicTacToe {
    private char[][] board;
    private boolean isXTurn;

    public TicTacToe() {
        board = new char[3][3];
        isXTurn = true;
        initializeBoard();
    }

    private void initializeBoard() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                board[i][j] = '-';
            }
        }
    }

    public String makeMove(int row, int col) {
        if (row < 0 || row >= 3 || col < 0 || col >= 3) {
            return "Invalid move";
        }
        if (board[row][col] != '-') {
            return "Cell is already occupied";
        }
        char symbol = isXTurn ? 'X' : 'O';
        board[row][col] = symbol;
        isXTurn = !isXTurn;
        return getBoardState();
    }

    public String getBoardState() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                sb.append(board[i][j]);
                if (j < 2) {
                    sb.append(" | ");
                }
            }
            sb.append("\n");
            if (i < 2) {
                sb.append("---------\n");
            }
        }
        return sb.toString();
    }

    public boolean hasWon(char symbol) {
        // Check rows
        for (int i = 0; i < 3; i++) {
            if (board[i][0] == symbol && board[i][1] == symbol && board[i][2] == symbol) {
                return true;
            }
        }
        // Check columns
        for (int i = 0; i < 3; i++) {
            if (board[0][i] == symbol && board[1][i] == symbol && board[2][i] == symbol) {
                return true;
            }
        }
        // Check diagonals
        if ((board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol) ||
                (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol)) {
            return true;
        }
        return false;
    }

    public boolean isDraw() {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (board[i][j] == '-') {
                    return false;
                }
            }
        }
        return true;
    }
}