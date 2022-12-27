#!/usr/bin/python3
import time
import re
from collections import deque

DEBUG = False
COLLECTING_TIME_PART1 = 24
COLLECTING_TIME_PART2 = 32


def parse_data():
    input_str = '''
    Blueprint 1: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 19 clay. Each geode robot costs 2 ore and 12 obsidian.
    Blueprint 2: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 19 clay. Each geode robot costs 2 ore and 9 obsidian.
    Blueprint 3: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 3 ore and 10 obsidian.
    Blueprint 4: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 14 clay. Each geode robot costs 4 ore and 15 obsidian.
    Blueprint 5: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 12 clay. Each geode robot costs 3 ore and 15 obsidian.
    Blueprint 6: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 3 ore and 19 obsidian.
    Blueprint 7: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 7 clay. Each geode robot costs 4 ore and 17 obsidian.
    Blueprint 8: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 14 clay. Each geode robot costs 3 ore and 16 obsidian.
    Blueprint 9: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 2 ore and 16 clay. Each geode robot costs 2 ore and 9 obsidian.
    Blueprint 10: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 5 clay. Each geode robot costs 3 ore and 7 obsidian.
    Blueprint 11: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 4 ore and 9 obsidian.
    Blueprint 12: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 14 obsidian.
    Blueprint 13: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 18 clay. Each geode robot costs 2 ore and 19 obsidian.
    Blueprint 14: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 13 clay. Each geode robot costs 3 ore and 12 obsidian.
    Blueprint 15: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 9 obsidian.
    Blueprint 16: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 4 ore and 8 obsidian.
    Blueprint 17: Each ore robot costs 2 ore. Each clay robot costs 2 ore. Each obsidian robot costs 2 ore and 17 clay. Each geode robot costs 2 ore and 10 obsidian.
    Blueprint 18: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 2 ore and 11 obsidian.
    Blueprint 19: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 12 clay. Each geode robot costs 3 ore and 8 obsidian.
    Blueprint 20: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 12 clay. Each geode robot costs 3 ore and 17 obsidian.
    Blueprint 21: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 7 clay. Each geode robot costs 2 ore and 9 obsidian.
    Blueprint 22: Each ore robot costs 2 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 17 clay. Each geode robot costs 4 ore and 20 obsidian.
    Blueprint 23: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 2 ore and 19 clay. Each geode robot costs 3 ore and 10 obsidian.
    Blueprint 24: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 3 ore and 9 clay. Each geode robot costs 3 ore and 7 obsidian.
    Blueprint 25: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 3 ore and 19 obsidian.
    Blueprint 26: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 16 clay. Each geode robot costs 3 ore and 20 obsidian.
    Blueprint 27: Each ore robot costs 3 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 19 clay. Each geode robot costs 4 ore and 11 obsidian.
    Blueprint 28: Each ore robot costs 4 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 11 clay. Each geode robot costs 4 ore and 7 obsidian.
    Blueprint 29: Each ore robot costs 3 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 2 ore and 12 obsidian.
    Blueprint 30: Each ore robot costs 4 ore. Each clay robot costs 4 ore. Each obsidian robot costs 4 ore and 8 clay. Each geode robot costs 2 ore and 15 obsidian.
    '''
    data = input_str.strip()
    lines = [x for x in data.split('\n')]

    blueprints = {}
    for _, line in enumerate(lines):
        id_blueprint, robot_ore_cost_ore, robot_clay_cost_ore, robot_obsidian_cost_ore, robot_obsidian_cost_clay, robot_geode_cost_ore, robot_geode_cost_obsidian = list(map(int, re.findall(r"(\d+)", line)))
        blueprints[id_blueprint] = (robot_ore_cost_ore, robot_clay_cost_ore, robot_obsidian_cost_ore, robot_obsidian_cost_clay, robot_geode_cost_ore, robot_geode_cost_obsidian)
    return blueprints


def exec_blueprint(id_blueprint, blueprint, time_left):
    if DEBUG:
        print(f"-- Start collecting with the Blueprint #{id_blueprint}")

    robot_ore_cost_ore, robot_clay_cost_ore, robot_obsidian_cost_ore, robot_obsidian_cost_clay, robot_geode_cost_ore, robot_geode_cost_obsidian = blueprint
    max_ore = max([robot_ore_cost_ore, robot_clay_cost_ore, robot_obsidian_cost_ore, robot_geode_cost_ore])
    max_geodes_cracked = 0
    collecting_state_seen = set()
    # collecting_state is (stock_ore, stock_clay, stock_obsidian, stock_geode, robots_ore, robots_clay, robots_obsidian, robots_geode, time)
    initial_collecting_state = (0, 0, 0, 0, 1, 0, 0, 0, time_left)
    queue = deque([initial_collecting_state])
    while queue:
        collecting_state = queue.popleft()
        stock_ore, stock_clay, stock_obsidian, stock_geode, robots_ore, robots_clay, robots_obsidian, robots_geode, time_left = collecting_state
        max_geodes_cracked = max(max_geodes_cracked, stock_geode)
        # no time left
        if time_left == 0:
            continue
        # abort the worst strategies...
        possible_geodes = (time_left * (time_left + 1)) / 2
        if possible_geodes + stock_geode < max_geodes_cracked:
            continue
        # it's not necessary to have more robots than the cost
        if robots_ore >= max_ore:
            robots_ore = max_ore
        if robots_clay >= robot_obsidian_cost_clay:
            robots_clay = robot_obsidian_cost_clay
        if robots_obsidian >= robot_geode_cost_obsidian:
            robots_obsidian = robot_geode_cost_obsidian
        # standardize resources inventory
        if stock_ore >= time_left * max_ore - robots_ore * (time_left - 1):
            stock_ore = time_left * max_ore - robots_ore * (time_left - 1)
        if stock_clay >= time_left * robot_obsidian_cost_clay - robots_clay * (time_left - 1):
            stock_clay = time_left * robot_obsidian_cost_clay - robots_clay * (time_left - 1)
        if stock_obsidian >= time_left * robot_geode_cost_obsidian - robots_obsidian * (time_left - 1):
            stock_obsidian = time_left * robot_geode_cost_obsidian - robots_obsidian * (time_left - 1)
        # update the collecting state
        collecting_state = (stock_ore, stock_clay, stock_obsidian, stock_geode, robots_ore, robots_clay, robots_obsidian, robots_geode, time_left)
        if collecting_state in collecting_state_seen:
            continue
        collecting_state_seen.add(collecting_state)
        # gather the resources for next round
        next_stock_ore = stock_ore + robots_ore
        next_stock_clay = stock_clay + robots_clay
        next_stock_obsidian = stock_obsidian + robots_obsidian
        next_stock_geode = stock_geode + robots_geode
        time_left -= 1
        # finally, explore all the strategies
        # first, do nothing... keep collecting
        queue.append((next_stock_ore, next_stock_clay, next_stock_obsidian, next_stock_geode, robots_ore, robots_clay, robots_obsidian, robots_geode, time_left))
        # then, if you can...
        # buy one robot for ore
        if stock_ore >= robot_ore_cost_ore:
            queue.append((next_stock_ore - robot_ore_cost_ore, next_stock_clay, next_stock_obsidian, next_stock_geode, robots_ore + 1, robots_clay, robots_obsidian, robots_geode, time_left))
        # buy one robot for clay
        if stock_ore >= robot_clay_cost_ore:
            queue.append((next_stock_ore - robot_clay_cost_ore, next_stock_clay, next_stock_obsidian, next_stock_geode, robots_ore, robots_clay + 1, robots_obsidian, robots_geode, time_left))
        # buy one robot for obsidian
        if stock_ore >= robot_obsidian_cost_ore and stock_clay >= robot_obsidian_cost_clay:
            queue.append((next_stock_ore - robot_obsidian_cost_ore, next_stock_clay - robot_obsidian_cost_clay, next_stock_obsidian, next_stock_geode, robots_ore, robots_clay, robots_obsidian + 1, robots_geode, time_left))
        # buy one robot for geode
        if stock_ore >= robot_geode_cost_ore and stock_obsidian >= robot_geode_cost_obsidian:
            queue.append((next_stock_ore - robot_geode_cost_ore, next_stock_clay, next_stock_obsidian - robot_geode_cost_obsidian, next_stock_geode, robots_ore, robots_clay, robots_obsidian, robots_geode + 1, time_left))

    if DEBUG:
        print(f"You cracked {max_geodes_cracked} geodes")

    return max_geodes_cracked


def solve_part1(blueprints, collecting_time):
    answer = 0
    for id_blueprint, blueprint in blueprints.items():
        answer += id_blueprint * exec_blueprint(id_blueprint, blueprint, collecting_time)
    print(f"Part1, your puzzle answer is: {answer}")


def solve_part2(blueprints, collecting_time):
    answer = 1
    for i in range(1, 4):
        answer *= exec_blueprint(i, blueprints[i], collecting_time)
    print(f"Part2, your puzzle answer is: {answer}")


def monitor_execution(fun, args):
    start_time = time.time()
    fun(*args)
    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f'Execution time: {elapsed_time:.3f} seconds\n')


def main():
    blueprints = parse_data()
    monitor_execution(solve_part1, [blueprints, COLLECTING_TIME_PART1])
    monitor_execution(solve_part2, [blueprints, COLLECTING_TIME_PART2])


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('KeyboardInterrupt')
