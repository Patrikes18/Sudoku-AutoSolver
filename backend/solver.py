def solve(board: list[list[int]], widthCell, heightCell) -> list[list[int]] | None:
    pos = find_best_empty_cell(board, widthCell, heightCell)

    if pos is None:
        return board

    row, col = pos

    for value in candidates(board, row, col, widthCell, heightCell):
        board[row][col] = value

        if solve(board, widthCell, heightCell) is not None:
            return board

        board[row][col] = 0

    return None

def find_best_empty_cell(board, widthCell, heightCell):
    best = None
    best_candidates = None

    for row in range(len(board)):
        for col in range(len(board[row])):
            if board[row][col] != 0:
                continue

            possible = candidates(board, row, col, widthCell, heightCell)

            if not possible:
                return (row, col)

            if best_candidates is None or len(possible) < len(best_candidates):
                best = (row, col)
                best_candidates = possible

                if len(possible) == 1:
                    return best

    return best

def candidates(board, row, col, widthCell, heightCell):
    if board[row][col] != 0:
        return set()

    side = widthCell * heightCell
    possible = set(range(1, side + 1))

    # Remove numbers already in the row
    possible -= set(board[row])

    # Remove numbers already in the column
    possible -= {board[r][col] for r in range(side)}

    # Find top-left corner of the box
    box_row = (row // heightCell) * heightCell
    box_col = (col // widthCell) * widthCell

    # Remove numbers already in the box
    for r in range(box_row, box_row + heightCell):
        for c in range(box_col, box_col + widthCell):
            possible.discard(board[r][c])

    return possible