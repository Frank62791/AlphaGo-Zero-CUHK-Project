import Arena
from MCTS import MCTS
from othello.OthelloGame import OthelloGame as Game
from othello.OthelloPlayers import *
from othello.pytorch.NNet import NNetWrapper as NNet
import logging

import numpy as np
from utils import *

"""
use this script to play any two agents against each other, or play manually with
any agent.
"""


class Fight():
    def __init__(self,):
        self.log = logging.getLogger(__name__)
        self.g = Game(8)

        hp = HumanOthelloPlayer(self.g).play

    # nnet players
        n1 = NNet(self.g)

        n1.load_checkpoint('./model4/', 'best.pth.tar')
        args1 = dotdict({'numMCTSSims': 50, 'cpuct': 1.0})
        mcts1 = MCTS(self.g, n1, args1)
        def n1p(x): return np.argmax(mcts1.getActionProb(x, temp=0))

        player2 = hp

        self.players = [player2, None, n1p]
        self.curPlayer = -1
        self.board = self.g.getInitBoard()

    def play(self, action: str):
        valid = self.g.getValidMoves(self.board, -1)
        input_a = [action[0], action[1]]
        while True:
            if len(input_a) == 2:
                try:
                    x, y = [int(i) for i in input_a]
                    if ((0 <= x) and (x < self.g.n) and (0 <= y) and (y < self.g.n)) or \
                            ((x == self.g.n) and (y == 0)):
                        a = self.g.n * x + y if x != -1 else self.g.n ** 2
                        if valid[a]:
                            action = a
                            break
                except ValueError:
                    pass
            print('Invalid move')
            break
        valids = self.g.getValidMoves(
            self.g.getCanonicalForm(self.board, self.curPlayer), 1)

        if valids[action] == 0:
            self.log.error(f'Action {action} is not valid!')
            self.log.debug(f'valids = {valids}')
            assert valids[action] > 0
        self.board, self.curPlayer = self.g.getNextState(
            self.board, self.curPlayer, action)
        if self.game_end() == False:
            return self.model_play()
        else:
            return self.game_end()

    def game_end(self):
        if self.g.getGameEnded(self.board, self.curPlayer) == 0:
            return False
        else:
            result = self.get_valid_moves()
            if self.g.getGameEnded(self.board, -1) == 1:
                result.update({'result': 'win'})
            elif self.g.getGameEnded(self.board, -1) == -1:
                result.update({'result': 'lose'})
            else:
                result.update({'result': 'draw'})
            return result

    def get_board(self):
        return self.get_valid_moves()

    def get_curPlayer(self):
        return self.curPlayer

    def get_valid_moves(self):
        valid = self.g.getValidMoves(
            self.g.getCanonicalForm(self.board, self.curPlayer), 1)
        moves = []
        for i in range(len(valid)):
            if valid[i]:
                moves.append(str(int(i/self.g.n))+str(int(i % self.g.n)))
        print(moves)
        board_list = []
        sub_board = []
        for x in range(len(self.board)):
            for y in range(len(self.board)):
                sub_board.append(str(self.board[x][y]))
            board_list.append(sub_board)
            sub_board = []
        json_value = {'board': board_list, 'moves': moves}
        return json_value

    def model_play(self):
        action = self.players[self.curPlayer +
                              1](self.g.getCanonicalForm(self.board, self.curPlayer))
        valids = self.g.getValidMoves(
            self.g.getCanonicalForm(self.board, self.curPlayer), 1)

        if valids[action] == 0:
            self.log.error(f'Action {action} is not valid!')
            self.log.debug(f'valids = {valids}')
            assert valids[action] > 0
        self.board, self.curPlayer = self.g.getNextState(
            self.board, self.curPlayer, action)
        valid = self.g.getValidMoves(
            self.g.getCanonicalForm(self.board, self.curPlayer), 1)
        if sum(valid) == 1 and valid[-1] == 1 and self.game_end() == False:
            self.curPlayer = -self.curPlayer
            self.model_play()        
        if self.game_end() == False:
            return self.get_valid_moves()
        else:
            return self.game_end()