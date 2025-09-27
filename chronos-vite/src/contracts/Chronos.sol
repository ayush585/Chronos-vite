// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Chronos {
    struct Task {
        address owner;
        string title;
        uint256 createdAt;
        bool done;
    }

    uint256 public taskCount;
    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 indexed id, address indexed owner, string title, uint256 createdAt);
    event TaskToggled(uint256 indexed id, bool done);

    function createTask(string calldata title) external returns (uint256 id) {
        id = ++taskCount;
        tasks[id] = Task({
            owner: msg.sender,
            title: title,
            createdAt: block.timestamp,
            done: false
        });
        emit TaskCreated(id, msg.sender, title, block.timestamp);
    }

    function toggleDone(uint256 id) external {
        Task storage t = tasks[id];
        require(t.owner != address(0), "Task not found");
        require(msg.sender == t.owner, "Not owner");
        t.done = !t.done;
        emit TaskToggled(id, t.done);
    }

    function getTask(uint256 id) external view returns (Task memory) {
        return tasks[id];
    }
}
