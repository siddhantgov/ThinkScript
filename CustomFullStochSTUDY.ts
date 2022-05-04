declare lower;

input over_bought = 80;
input over_sold = 20;
input KPeriod = 10;
input DPeriod = 10;
input priceH = high;
input priceL = low;
input priceC = close;
input slowing_period = 3;
input averageType = AverageType.SIMPLE;
input showBreakoutSignals = {default "No", "On FullK", "On FullD", "On FullK & FullD"};

def lowest_k = Lowest(priceL, KPeriod);
def c1 = priceC - lowest_k;
def c2 = Highest(priceH, KPeriod) - lowest_k;
def FastK = if c2 != 0 then c1 / c2 * 100 else 0;

plot FullK = MovingAverage(averageType, FastK, slowing_period);
plot FullD = MovingAverage(averageType, FullK, DPeriod);

plot OverBought = over_bought;
plot OverSold = over_sold;

def upK = FullK crosses above OverSold;
def upD = FullD crosses above OverSold;
def downK = FullK crosses below OverBought;
def downD = FullD crosses below OverBought;

plot UpSignal;
plot DownSignal;
switch (showBreakoutSignals) {
case "No":
    UpSignal = Double.NaN;
    DownSignal = Double.NaN;
case "On FullK":
    UpSignal = if upK then OverSold else Double.NaN;
    DownSignal = if downK then OverBought else Double.NaN;
case "On FullD":
    UpSignal = if upD then OverSold else Double.NaN;
    DownSignal = if downD then OverBought else Double.NaN;
case "On FullK & FullD":
    UpSignal = if upK or upD then OverSold else Double.NaN;
    DownSignal = if downK or downD then OverBought else Double.NaN;
}

UpSignal.setHiding(showBreakoutSignals == showBreakoutSignals."No");
DownSignal.setHiding(showBreakoutSignals == showBreakoutSignals."No");

FullK.SetDefaultColor(GetColor(5));
FullD.SetDefaultColor(GetColor(0));
OverBought.SetDefaultColor(GetColor(1));
OverSold.SetDefaultColor(GetColor(1));
UpSignal.SetDefaultColor(Color.UPTICK);
UpSignal.SetPaintingStrategy(PaintingStrategy.ARROW_UP);
DownSignal.SetDefaultColor(Color.DOWNTICK);
DownSignal.SetPaintingStrategy(PaintingStrategy.ARROW_DOWN);
