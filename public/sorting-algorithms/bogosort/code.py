import random

def is_sorted(data):
    for i in range(len(data) - 1):
        if data[i] > data[i + 1]:
            return False
    return True

def bogosort(data):
    attempts = 0
    while not is_sorted(data):
        random.shuffle(data)
        attempts += 1
    return data, attempts

if __name__ == "__main__":
    data = [3, 2, 5, 1, 4]
    sorted_data, attempts = bogosort(data)
    print(f"Sorted data: {sorted_data}")
    print(f"Attempts: {attempts}")