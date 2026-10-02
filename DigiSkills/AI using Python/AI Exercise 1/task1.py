total_sales = 0

for i in range(1, 6):
    sales = float(input(f"Enter sales amount for Employee {i}: "))

    if sales < 50000:
        tax = sales * 0.05
    elif sales <= 100000:
        tax = sales * 0.10
    else:
        tax = sales * 0.15

    print("Sales Amount:", sales)
    print("Tax Amount:", tax)
    print("--------------------")

    total_sales += sales

average_sales = total_sales / 5

print("Total Sales:", total_sales)
print("Average Sales:", average_sales)