class Customer:
    def __init__(self, name):
        self.name = name


class Account:
    def __init__(self, customer, balance=0):
        self.customer = customer
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        print("Amount deposited:", amount)

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            print("Amount withdrawn:", amount)
        else:
            print("Insufficient balance.")

    def display_balance(self):
        print("Current Balance:", self.balance)


# Create customer
name = input("Enter customer name: ")

customer = Customer(name)

# Create account
account = Account(customer)

print("\nAccount created successfully!")
print("Customer Name:", customer.name)

# Deposit
deposit_amount = float(input("\nEnter amount to deposit: "))
account.deposit(deposit_amount)

# Withdraw
withdraw_amount = float(input("Enter amount to withdraw: "))
account.withdraw(withdraw_amount)

# Display balance
account.display_balance()