import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import React, { useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	contentWidthArr,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

export const ArticleParamsForm = (
	props: ArticleStateType & { onChange: (newState: ArticleStateType) => void }
) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [state, setState] = useState<ArticleStateType>(props);

	const onClickApplay = (event: React.FormEvent): void => {
		event.preventDefault();
		props.onChange(state);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prevState) => !prevState);
				}}
			/>
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={onClickApplay}>
					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						onChange={(selected: OptionType) => {
							setState((prevState) => ({
								...prevState,
								fontFamilyOption: selected,
							}));
						}}
					/>
					<RadioGroup
						title={'размер шрифта'}
						name={'???'}
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(selected: OptionType) => {
							setState((prevState) => ({
								...prevState,
								fontSizeOption: selected,
							}));
						}}
					/>
					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={state.fontColor}
						onChange={(selected: OptionType) => {
							setState((prevState) => ({
								...prevState,
								fontColor: selected,
							}));
						}}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={(selected: OptionType) => {
							setState((prevState) => ({
								...prevState,
								backgroundColor: selected,
							}));
						}}
					/>
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={(selected: OptionType) => {
							setState((prevState) => ({
								...prevState,
								contentWidth: selected,
							}));
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								props.onChange(defaultArticleState);
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
