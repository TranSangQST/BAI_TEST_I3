-- Create Table
CREATE TABLE Account (
    account_id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    fullname VARCHAR(255),
    email VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
);

CREATE TABLE Account_Friend (
    account_friend_id INT PRIMARY KEY,
    account1_id INT,
    account2_id INT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (account1_id) REFERENCES Account(account_id),
    FOREIGN KEY (account2_id) REFERENCES Account(account_id)
);


CREATE TABLE ChatGroup (
    chat_group_id INT PRIMARY KEY,
    name VARCHAR(255),
    created_at DATETIME,
    updated_at DATETIME,
    created_account_id INT,
    FOREIGN KEY (created_account_id) REFERENCES Account(account_id),
    
);


CREATE TABLE ChatGroupAccount (
    chat_group_account_id INT PRIMARY KEY,
    account_id INT,
    chat_group_id INT,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (account_id) REFERENCES Account(account_id),
    FOREIGN KEY (chat_group_id) REFERENCES ChatGroup(chat_group_id)
);


CREATE TABLE Message (
    message_id INT PRIMARY KEY,
    chat_group_id INT,
    sender_id INT,
    content VARCHAR(MAX),
    created_at DATETIME,
    updated_at DATETIME,

    FOREIGN KEY (chat_group_id) REFERENCES ChatGroup(chat_group_id),
    FOREIGN KEY (sender_id) REFERENCES Account(account_id)
);


CREATE TABLE MessageRead (
    message_read_id INT PRIMARY KEY,
    message_id INT,
    account_id INT,
    read_at DATETIME,
    FOREIGN KEY (message_id) REFERENCES Message(message_id),
    FOREIGN KEY (account_id) REFERENCES Account(account_id)
);


-- Insert Data
INSERT INTO Account (account_id, username, fullname, email, created_at, updated_at)
VALUES (1, 'user1', 'User One', 'user1@example.com', '2023-01-01 10:00:00', '2023-01-01 10:00:00'),
       (2, 'user2', 'User Two', 'user2@example.com', '2023-01-02 11:00:00', '2023-01-02 11:00:00'),
       (3, 'user3', 'User Three', 'user3@example.com', '2023-01-03 12:00:00', '2023-01-03 12:00:00');


INSERT INTO Account_Friend (account_friend_id, account1_id, account2_id, created_at, updated_at)
VALUES (1, 1, 2, '2023-01-05 14:00:00', '2023-01-05 14:00:00'),
       (2, 1, 3, '2023-01-06 15:00:00', '2023-01-06 15:00:00');

INSERT INTO ChatGroup (chat_group_id, name, created_at, updated_at, created_account_id)
VALUES (1, 'Group Chat 1', '2023-01-10 10:00:00', '2023-01-10 10:00:00', 1),
       (2, 'Group Chat 2', '2023-01-11 11:00:00', '2023-01-11 11:00:00', 2),
       (3, 'Group Chat 3', '2023-01-12 12:00:00', '2023-01-12 12:00:00', 3);

INSERT INTO ChatGroupAccount (chat_group_account_id, account_id, chat_group_id, created_at, updated_at)
VALUES (1, 1, 1, '2023-01-10 10:00:00', '2023-01-10 10:00:00'),
       (2, 2, 1, '2023-01-10 10:05:00', '2023-01-10 10:05:00'),
       (3, 2, 2, '2023-01-11 11:05:00', '2023-01-11 11:05:00'),
       (4, 3, 2, '2023-01-11 11:10:00', '2023-01-11 11:10:00');

-- 
INSERT INTO Message (message_id, chat_group_id, sender_id, content, created_at, updated_at)
VALUES (1, 1, 1, 'Hello, this is a message.', '2023-01-10 10:10:00', '2023-01-10 10:10:00'),
       (2, 1, 2, 'Hi, I received your message.', '2023-01-10 10:15:00', '2023-01-10 10:15:00'),
       (3, 2, 1, 'Hey, How are u?', '2023-01-11 11:15:00', '2023-01-11 11:15:00'),
       (4, 2, 2, 'Not much, just chatting.', '2023-01-11 11:20:00', '2023-01-11 11:20:00');



INSERT INTO MessageRead (message_read_id, message_id, account_id, read_at)
VALUES (1, 1, 1, '2023-01-10 10:20:00'),
       (2, 3, 1, '2023-01-11 11:30:00');


INSERT INTO MessageRead (message_read_id, message_id, account_id, read_at)
VALUES (3, 2, 2, '2023-01-10 10:25:00'),
       (4, 4, 2, '2023-01-11 11:35:00');


-- 4. Truy vấn danh sách account, kèm theo số lượng nhóm chat mà mỗi account tham gia.
SELECT A.account_id, A.username, COUNT(MG.chat_group_id) AS NumberOfGroups
FROM Account A
LEFT JOIN ChatGroupAccount MG ON A.account_id = MG.account_id
GROUP BY A.account_id, A.username;


-- 5. Đầu vào là 1 account, biết được danh sách các account khác cùng nhóm chat nhưng chưa kết bạn.
CREATE PROCEDURE GetNonFriendsInSameChatGroup
    @AccountID INT
AS
BEGIN
    SELECT DISTINCT A2.account_id, A2.username
    FROM ChatGroupAccount CGA1
    JOIN ChatGroupAccount CGA2 ON CGA1.chat_group_id = CGA2.chat_group_id
    JOIN Account A1 ON CGA1.account_id = A1.account_id
    JOIN Account A2 ON CGA2.account_id = A2.account_id
    WHERE A1.account_id = @AccountID
          AND A2.account_id <> @AccountID
          AND A2.account_id NOT IN (
              SELECT account2_id
              FROM Account_Friend
              WHERE account1_id = @AccountID
          )
          AND A2.account_id NOT IN (
              SELECT account1_id
              FROM Account_Friend
              WHERE account2_id = @AccountID
          );
END;


EXEC GetNonFriendsInSameChatGroup @AccountID = 1;


-- 6. Đầu vào là 1 account, biết được danh sách nhóm chat mà account đó chưa đọc tin nhắn cuối cùng của nhóm.
CREATE PROCEDURE GetUnreadChatGroups
    @AccountID INT
AS
BEGIN
    SELECT DISTINCT CG.chat_group_id, CG.name
    FROM ChatGroup CG
    JOIN ChatGroupAccount CGA ON CG.chat_group_id = CGA.chat_group_id
    WHERE CGA.account_id = @AccountID
    AND CG.chat_group_id NOT IN (
        SELECT M.chat_group_id
        FROM Message M
        LEFT JOIN MessageRead MR ON M.message_id = MR.message_id AND MR.account_id = @AccountID
        WHERE MR.message_id IS NULL
        AND M.created_at = (
            SELECT MAX(created_at)
            FROM Message
            WHERE chat_group_id = M.chat_group_id
        )
    );
END;

EXEC GetUnreadChatGroups @AccountID = 1;
